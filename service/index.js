import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import {nanoid} from 'nanoid';
const app = express();

const authCookieName = 'token';

let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

var apiRouter = express.Router();

app.use('/api', apiRouter);

apiRouter.get('/users', async (req, res) => {
    res.send(users);
});

apiRouter.get('/users:username', async (req, res) => {
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
    console.log("Made it to the beginning of the endpoint");
    if (await findUser('username', req.body.username)) {
        console.log("User already found");
        res.status(403).send({ msg: 'Existing user' });
    } else {
        console.log("Made it to the create user function");
        const user = await createUser(req.body.username, req.body.password, req.body.email);
        
        console.log("success in creating user");
        setAuthCookie(res, user.token);
        console.log("success in setting auth Cookie");
        res.status(200);
        console.log("set res status");
        res.send({username: user.username, token: user.token});
    }
});

//Login an existing user and provide auth token
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = nanoid();
            setAuthCookie(res,user.token);
            res.status(200);
            res.send({ user: user.username, authState: 'Authenticated' });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized'});
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.body.token);
    if (user) {
        console.log(user.token);
        user.token = '';
    }
    else {
        res.status(401).send({ msg: "Unauthorized"});
    }
    res.clearCookie(authCookieName);
    console.log("Cleared token");
    //console.log(user.token);
    res.status(200)
    res.send();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.body.token);
    if (user) {
        console.log("verified auth");
        next();
    } else {
        console.log("I am in verifyAuth");
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.post('/auth/addtask', verifyAuth, async (req, res) => {
    const user = await findUser('username',req.body.username);
    if (user) {
        const task = await createTask(req.body.task, req.body.priority, req.body.time, req.body.taskID);
        setTasks(user,task);
        res.status(200).end();
        return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

function setTasks(user, taskObject) {
    if (!user.tasks) {
        user.tasks = [];
    }
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
        token: nanoid(),
    };

    users.push(user);

    return user;
};

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
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