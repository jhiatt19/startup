const typeOfTask ={
    User: 'user',
    complete: 'finished',
    started: 'began',
}

class Message {
    constructor(from, type, value){
        this.from = from;
        this.type = type;
        this.value = value;
    }
}

class TaskMessage {
    alerts = [];
    handlers = [];

    constructor(){

        setInterval(()=> {
            const username = "Billy";
            const difficulty = "hard";
            const time = "1 hr";
            this.sendTaskMessage(username, typeOfTask.complete, {name:username, difficulty: difficulty, time:time});
        },5000);
    }

    sendTaskMessage(from,type,value){
        const alert = new Message(from,type,value);
        this.revieveEvent(alert);
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    revieveAlert(alert) {
        this.alerts.push(alert);
        
        this.handlers.forEach((handler) => {
            handler(alert);
        });
    }
}

const TaskMessage = new TaskMessage();
export {typeOfTask, TaskMessage};