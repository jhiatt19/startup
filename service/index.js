import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
const app = express();

const authCookieName = 'token';

let users = [];
let tokens = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

var apiRouter = express.Router();

app.use('/api', apiRouter);

apiRouter.get('/users', async (req, res) => {
    res.send(users);
});

apiRouter.get('/tokens', async (req,res) => {
    res.send(tokens);
});

apiRouter.get('/tokens/:username', async (req, res) => {
    console.log(req.cookies.token);
    const token = await findToken('auth',req.cookies.token);
    if (token){
        res.send(token);
    }
    else {
        res.status(403).send({ msg: "No token found"});
    }
});

apiRouter.get('/users/:username', async (req, res) => {
    const user = await findUser('username',req.params.username)
    if (user){
        res.send(user);
    }
    else {
        res.status(403).send({ msg: "No user found"});
    }
});

//Create a new user and provide auth token
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(403).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password, req.body.email);
        const token = nanoid();
        setAuthCookie(res, token);
        saveAuth(token,user.username);
        res.status(200).send({username: user.username, authState:'Authenticated' });
    }
});

//Login an existing user and provide auth token
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = nanoid();
            setAuthCookie(res, token);
            saveAuth(token,user.username);
            res.status(200);
            res.send({ user: user.username, authState: 'Authenticated' });
        }
        else {
            res.status(401).send({ msg: 'Not valid password'});
        }
    }else {
    res.status(401).send({ msg: 'Not valid username'});
    }
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const authToken = req.cookies.token;
    console.log(authToken);
    res.clearCookie(authCookieName);
    deleteToken(authToken);
    console.log(authToken);
    console.log("Cleared token");
    //console.log(user.token);
    res.status(200)
    res.send({authState: "Not Authenticated"});
});

const verifyAuth = async (req, res, next) => {
    console.log(req.headers);
    console.log("AuthToken: " + req.cookies.token);
    const token = await findToken('auth',req.cookies.token);
    if (token) {
        console.log("verified auth");
        next();
    } else {
        console.log("I am in verifyAuth");
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.post('/auth/addtask', verifyAuth, async (req, res) => {
    console.log(req.body);
    const user = await findUser('username',req.body.username);
    if (user) {
        const task = await createTask(req.body.task, req.body.priority, req.body.time, req.body.taskID);
        setTasks(user,task);
        res.status(200).end();
        return;
    }
    console.log("No user found");
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.get('/auth/getTaskData/:username', verifyAuth, async(req,res) => {
    console.log(req.headers);
    const user = await findUser('username', req.params.username);
    if (user) {
        res.send(user.tasks);
    } else {
        res.status(505).send({msg : "Error: User tasks not found"});
    }
    //res.status(403).send("Error: user not found");
});

apiRouter.delete('/auth/deleteTaskData/:username', verifyAuth, async(req,res) => {
    console.log(req.headers);
    console.log(req.body);
    const user = await findUser('username', req.params.username);
    if (user) {
        deleteTasks(user,req.deleteTasks);
    } else {
        res.status(505).send({ msg: "Error: User tasks not found" });
    }
});

function deleteTasks(user,tasks){
    for (const task in tasks) {
        user.tasks = user.tasks.filter(t => t !== task);
    }
}

function setTasks(user, taskObject) {
    user.tasks.push(taskObject);
};

async function createTask(taskMessage, priority, time, taskID){
    const task = {
        taskID : taskID,
        name : taskMessage,
        priority : priority,
        time : time,
    }
    return task;
};


async function createUser(username,password,email) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username : username,
        password: passwordHash,
        email: email,
        tasks: [],
    };

    users.push(user);

    return user;
};

async function findToken(field,value){
    if (!value) return null;

    return tokens.find((tok) => tok[field] === value);
}

async function deleteToken(value){
    if (!value) return null;
    else {
        tokens = tokens.filter(tok => tok.auth !== value);
    }
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
    });    
}

function saveAuth(authToken, username){
    const token = {
        user: username,
        auth: authToken,
    };
    tokens.push(token);
}

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});