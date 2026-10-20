import { MongoClient } from "mongodb";
import "dotenv/config";

const url = `mongodb://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE_NAME}?authSource=admin`;
const client = new MongoClient(url);
const db = client.db("Won_Stop_dev");
const userCollection = db.collection("users");
const authCollection = db.collection("auth");

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log("Connected to database");
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`,
    );
    process.exit(1);
  }
})();

function getUser(user) {
  return userCollection.findOne({ username: user });
}

function getUserByToken(token) {
  return authCollection.findOne({ auth: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addTask(task, user) {
  console.log(user.tasks);
  user.tasks[task.taskID] = task;
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function deleteTask(user, task) {
  console.log(task);
  task.forEach((id) => {
    delete user.tasks[id];
  });
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function getTasks(username) {
  const user = await getUser(username);
  console.log(user);
  return user.tasks;
}

async function addAuth(auth, username) {
  const currTime = new Date();
  const thirtyMinutesFromNow = new Date(currTime.getTime() + (30*60*1000));
  await authCollection.insertOne({ username: username, auth: auth, expireTime: thirtyMinutesFromNow });
}

function getAuthCode(token) {
  return authCollection.findOne({ auth: token });
}

async function deleteAuth(token) {
  const username = await getUserByToken(token);
  await authCollection.deleteMany({ username: username });
}

function clearAuthCodes() {
  const now = Date.now();
  authCollection.deleteMany({expireTime: { $lt: now}});
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
  getTasks,
  clearAuthCodes
};
