import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
const app = express();
const DB = require('./database.js')

const authCookieName = 'token';

let users = new Map();
let tokens = [];
let counter = 0;

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

var apiRouter = express.Router();

app.use('/api', apiRouter);

apiRouter.get('/users', async (req, res) => {
    let jsonUsers = Object.fromEntries(users.entries());
    res.send(jsonUsers);
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
    const user = await findUser(req.params.username)
    if (user){
        res.send(user);
    }
    else {
        res.status(403).send({ msg: "No user found"});
    }
});

//Create a new user and provide auth token
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser(req.body.username)) {
        res.status(403).send({ msg: 'Existing user' });
    } else {
        console.log(req.body);
        const user = await createUser(req.body.username, req.body.password, req.body.email);
        const token = nanoid();
        setAuthCookie(res, token);
        DB.addAuth(token,user.username);
        res.status(200).send({username: user.username, authState:'Authenticated' });
    }
    //res.status(507).send({ msg: "Failing the if statement"});
});

//Login an existing user and provide auth token
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser(req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = nanoid();
            setAuthCookie(res, token);
            DB.addAuth(token,user.username);
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
    res.clearCookie(authCookieName);
    DB.deleteAuth(authToken);
    res.status(200)
    res.send({authState: "Not Authenticated"});
});

const verifyAuth = async (req, res, next) => {
    const token = await findToken(req.cookies.token);
    if (token) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.post('/auth/addtask', verifyAuth, async (req, res) => {
    console.log(req.body);
    const user = await findUser(req.body.username);
    if (user) {
        const task = await createTask(req.body.task, req.body.priority, req.body.time);
        counter = counter + 1;
        setTasks(user,task);
        res.status(200).end();
        return;
    }
    console.log("No user found");
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.get('/auth/getTaskData/:username', verifyAuth, async(req,res) => {
    console.log(req.headers);
    console.log(req.body);
    const user = await findUser(req.params.username);
    if (user) {
        const jsonObject = Object.fromEntries(user.tasks.entries());
        console.log(jsonObject);
        res.send(jsonObject);
    } else {
        res.status(505).send({msg : "Error: User tasks not found"});
    }
    //res.status(403).send("Error: user not found");
});

apiRouter.delete('/auth/deleteTaskData/:username', verifyAuth, async(req,res) => {
    console.log(req.headers);
    console.log(req.body);
    const user = await findUser(req.params.username);
    console.log(user);
    if (user) {
        deleteTasks(user,req.body);
        res.status(200).end();
    } else {
        res.status(505).send({ msg: "Error: User tasks not found" });
    }
});

function deleteTasks(user,tasks){
    tasks.forEach(id => {
        user.tasks.delete(id);
    });
    users.set(user.username,user);
    console.log(users);
}

function setTasks(user, taskObject) {
    user.tasks.set(taskObject.taskID, taskObject);
    users.set(user.username,user);
};

async function createTask(taskMessage, priority, time){
    const task = {
        taskID : counter,
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
        tasks: new Map(),
    };
    DB.addUser(user);

    return user;
};

async function findToken(value){
    if (!value) return null;

    return DB.getAuth(value);
}

async function findUser(value) {
    if (!value) return null;

    if (users.size === 0) {
        return null;
    }

    if (users.has(value)){
        return DB.getUser(value);
    }
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });    
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