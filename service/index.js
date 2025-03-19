const express = require('express');
const cookieParser = require('cookie-parser');
const bycrypt = require('bycriptjs');
import {nanoid} from 'nanoid';
const app = express();

const authCookieName = 'token';

let users = [];
let tasks = [];

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