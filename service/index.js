const express = require('express');
const cookieParser = require('cookie-parser');
const bycrypt = require('bycriptjs');
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

//Create a new user and provide auth token
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(403).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password, req.body.email);
        
        setAuthCookie(res, user.token);
        res.send({username: user.username});
    }
});

//Login an existing user and provide auth token
apiRouter.post('/auth/login', async (req, res) => {
    const user = await('username', req.body.username);
    if (user) {
        if (await bycript.compare(req.body.password, user.password)) {
            user.token = nanoid();
            setAuthCookie(res,user.token);
            res.send({ user: user.username, authState: 'Authenticated' });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized'});
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(200).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.post('/auth/addtask', verifyAuth, async (req, res) => {
    const user = await findUser('username',req.body.username);
    if (user) {
        const task = await createTask(req.body.task, req.body.priority, req.body.time, req.body.taskID);
        setTasks(user, user.username,task);
        res.status(200).send( msg: "Task added successfully");
        return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
})

function setTasks(user, username, taskObject) {
    const user = findUser('username',username);
    if (user){
        if (!user.tasks) {
            user.tasks = [];
        }
        user.tasks.push(taskObject);
    }
    else {
        console.log(`User with username ${username} not found`);
    }
}

async function createTask(task, priority, time, taskID){
    const task = {
        task : task,
        priority : priority,
        time : time,
        taskID : taskID,
    }
    return task;
}


async function createUser(username,password,email) {
    const passwordHash = await bycrypt.hash(password, 10);

    const user = {
        username : username,
        password: passwordHash,
        email: email,
        token: nanoid(),
    };

    users.push(user);

    return user;
}

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});