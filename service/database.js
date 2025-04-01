import { MongoClient } from 'mongodb';
import config from './dbConfig.json' with {type: 'json'};

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('Won_Stop');
const userCollection = db.collection('users');
const authCollection = db.collection('auth');

(async function testConnection() {
    try {
        await db.command({ping: 1});
        console.log('Connected to database');
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(user){
    return userCollection.findOne({username: user});
}

function getUserByToken(token){
    return authCollection.findOne({auth: token});
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({username: user.username}, {$set: user});
}

async function addTask(task,user) {
    console.log(user.tasks);
    user.tasks[(task.taskID)] = task;
    await userCollection.updateOne({username: user.username}, {$set: user});
}

async function deleteTask(user,task){
    console.log(task);
    task.forEach(id => {
        delete user.tasks[id];
    });
    await userCollection.updateOne({username: user.username},{$set:user});
}

async function getTasks(username){
    const user = await getUser(username);
    console.log(user);
    return user.tasks;
}

async function addAuth(auth,username){
    await authCollection.insertOne({username:username, auth:auth});
}

function getAuthCode(token){
    return authCollection.findOne({auth: token});
}

async function deleteAuth(token){
    const username = await getUserByToken(token);
    await authCollection.deleteMany({username:username});
}

export {
    getUser,
    getUserByToken,
    addUser,
    addTask,
    updateUser,
    addAuth,
    getAuthCode,
    deleteAuth,
    deleteTask,
    getTasks
}