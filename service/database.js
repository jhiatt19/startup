const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('Won_Stop');
const userCollection = db.collection('user');
const authCollection = db.collection('auth');
const taskCollection = db.collection('task');

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
    return userCollection.findOne({username: user.username});
}

function getUserByToken(token){
    return userCollection.findOne({token: token});
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({username: user.username}, {$set: user});
}

async function addTask(task) {
    await userCollection.updateOne({username: user.username}, {$set: user});
}

async function deleteTask(task){

}

async function addAuth(code,username){
    const authData = {auth: code, username: username};
    await authCollection.insertOne(authData);
}

function getAuthCode(token){
    return authCollection.findOne({auth: token});
}

async function deleteAuth(token){
    const auth = getAuthCode(token);
    const deleteQuery = {_id:auth.insertedId};
    await authCollection.deleteOne(deleteQuery);
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    addTask,
    updateUser,
    addAuth,
    getAuthCode,
    deleteAuth,
    deleteTask
}