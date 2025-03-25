import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {nanoid} from 'nanoid';
import './productivity.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function BannerMessage({message, onClose}) {
    return (
        <div className="banner-alert">
            <span>{message}</span>
            <button onClick={onClose}>x</button>
        </div>
    );
};

function CreateMessage({handleCloseAlert,alerts}) {
    const reversedAlerts = alerts.slice().reverse();
    return (    
        <div className='banner-container'>
            {reversedAlerts.map((alert) => (
                <BannerMessage
                    key={alert.id}
                    message={alert.message}
                    onClose={() => handleCloseAlert(alert.id)}
                />
            ))}  
        </div>
    );
};

//const initalTaskData = await pullTaskData();

export function ProductivityCalendar(username) {
    const [task,setTask] = useState('');
    const [time, setTime] = useState('Choose Est time');
    const [priority, setPriority] = useState('Choose priority level');
    const [taskData,setTaskData] = useState(null);
    const [checkItems, setCheckItems] = useState([]);
    const [alerts,setAlerts] = useState([]);
    const [displayAlert, setDisplayAlert] = useState(false);
    const names = ["Max ", "Billy ", "Hannah ", "Kate "];
    const finStart = ["created ", "finished "];
    const numComplete = [1, 2, 3, 4, 5, 6];
    const [isError, setIsError] = useState(false);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(true);
  
    const pullTaskData = useCallback(async () => {
        console.log(taskData);
        console.log("I am in pullTaskData ",username.username);
        setLoading(true);
        try {
            const response = await fetch(`/api/auth/getTaskData/${username.username}`, {
            method: 'get',
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response?.status === 200) {
            const res = await response.json();
            console.log("Returned data: ", res);
            setTaskData(res || {});
            console.log(taskData);
        } else {
            const body = await response.json();
            setError(`Error: ${body.msg}`);
            setIsError(true);
        }
    } catch (err) {
        setError(`Error: ${err.message}`);
        setIsError(true);
    } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        pullTaskData();
    }, [pullTaskData]);

    const handleCloseAlert = (id) => {
        setAlerts((oldAlerts) => oldAlerts.filter((message) => message.id !== id));
        if (alerts.length <= 1){
            setDisplayAlert(false);
        };
    };
    
    const handlePriority = (e) => {
        setPriority(e.target.value);
    };

    const handleTime = (e) => {
        setTime(e.target.value);
    };

    const handleTask = (e) => {
        setTask(e.target.value);
    };

    
    async function addTask(taskData){
        const response = await fetch('/api/auth/addtask', {
            method: 'post',
            body: JSON.stringify({username: username.username, task: taskData.task, priority: taskData.priority, time: taskData.time}),
            headers: {
                'Content-type': 'application/json',
            }
        });
        if (response?.status === 200){
            pullTaskData();
        }
    }

    async function deleteTasks(tasks){
        console.log(tasks);
        console.log(JSON.stringify(tasks));
        const response = await fetch(`api/auth/deleteTaskData/${username.username}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tasks)
        });
        if (response?.status === 200){
            pullTaskData();
        }
        else {
            const body = await response.json();
            setError(`Error: ${body.msg}`);
            setIsError(true);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task || time === "Choose Est time" || priority === "Choose priority level") return;
        const newTask = {
            task: task,
            time: time,
            priority: priority,
        }
        addTask(newTask);        
        setAlerts((prevAlerts) => [
            ...prevAlerts,
            {id:nanoid(), message:username.username + " created a task.",}
        ])
        setDisplayAlert(true);
        //setTaskData([...taskData,newTask]);
        setTask('');
        setPriority("Choose priority level");
        setTime("Choose Est time");
        
    };

    const handleCheckItems = (id) => {
        if (checkItems.includes(id)){
            setCheckItems(checkItems.filter((item) => item !== id));
        }
        else{
            setCheckItems([...checkItems,id]);
        }
    };

    const tableRows = useMemo(() => {
        if (!taskData) return null;
        return Object.entries(taskData).map(([key,value]) => (
        <tr key={key}>
            <td style={{backgroundColor:value.priority}}>{value.name}</td>
            <td>{value.time}</td>         
            <td><input className='checkBox' data-row-id={key} checked={checkItems.includes(key)} type="checkbox" onChange={() => handleCheckItems(key)}/></td>
        </tr>
    ));
}, [taskData, checkItems]);

    const handleEdit = (e) => {
        e.preventDefault();
        setDisplayAlert(true);
        const removeRows = document.querySelectorAll('.checkBox:checked');
        const removeIDs = Array.from(removeRows).map(rmID => rmID.dataset.rowId);
        const tempInt = removeIDs.length;
        const intIDs = removeIDs.map(char => parseInt(char));
        //const deleteTaskData = taskData.filter(row => removeIDs.includes(row.id));
        deleteTasks(intIDs);
        setCheckItems([]);
        if (tempInt > 1){
            setAlerts((prevAlerts) => [
                ...prevAlerts,
                {id:nanoid(), message:username.username + " finished " + tempInt + " tasks!"}
            ]);
        }
        setAlerts((prevAlerts) => [
            ...prevAlerts,
            {id:nanoid(), message:username.username + " finished a task!"}
        ]);
    };
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomName = names[Math.floor(Math.random()*names.length)];
            const randomfinStart = finStart[Math.floor(Math.random()*finStart.length)];
            const randomnumComplete = numComplete[Math.floor(Math.random()*numComplete.length)];
            let uniqueMessage = '';
            if (randomfinStart === "created "){
                uniqueMessage = randomName + randomfinStart + "a task.";
            }
            else {
                if (randomnumComplete === 1) {
                    uniqueMessage = randomName + randomfinStart + "a task!";
                }
                else {
                    uniqueMessage = randomName + randomfinStart + randomnumComplete + " tasks!";
                }
            };
            setAlerts((prevAlerts) => [...prevAlerts, {id:nanoid(),message:uniqueMessage}]);
            setDisplayAlert(true);
        },10000);

        return () => clearInterval(intervalId);
    },[alerts]);

    useEffect(()=> {
        if (alerts.length > 10) {
            setAlerts((prevEvents) => {
                prevEvents = prevEvents.slice(1,10);
                return prevEvents
            });}
    },[alerts]);

  return (
    <main>
        {displayAlert && (
        <section className='alert'>
            {<CreateMessage alerts={alerts} handleCloseAlert={handleCloseAlert}/>}
        </section>
        )}
        <section>
            <h3>Task Prioritizer</h3>
            <p>Another thing that I struggle with is determining what tasks to do at different times. Sometimes I spend more time coming up with a plan on when I will do all my tasks than actually doing the task. In this section I hope to create an algorithm to place tasks into my calendar based on priority and estimated time to complete task.</p>
        </section>
        <section>
            <h3 id="newtask">Add new task</h3>
            <form id="newTask" onSubmit={handleSubmit}>
                <textarea className="form-control" id="task" rows="3" value={task} onChange={handleTask} placeholder="Enter task..."></textarea>
                <label htmlFor="time">Estimated time:</label>
                <select id="times" name="time" onChange={handleTime} value={time}>
                    <option>Choose Est time</option>
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option> 1 hour</option>
                    <option> 1.5 hours</option>
                    <option> 2 hours</option>
                    <option> 2.5 hours</option>
                    <option> 3 hours</option>
                    <option> 4 hours</option>
                    <option> 5 hours</option>
                    <option> 6 hours</option>
                    <option> 7 hours</option>
                    <option> 8 hours</option>
                    <option> All day</option>
                </select><br/>
                <label htmlFor="priority">Priority Level:</label>
                <select id="lvlpriority" name="priority" value={priority} onChange={handlePriority}>
                    <option value="none">Choose priority level</option>
                    <option value='green'>Low</option>
                    <option value='yellow'>Medium</option>
                    <option value='orange'>High</option>
                    <option value='red'>Extreme</option>
                </select><br/> {/*Any new tasks that are created will send an alert letting people know that another user has added tasks to there calendar.*/}
                <button id="buttonButton" type="submit">Submit</button>
            </form>
        </section>
        <section>
            <table id="productivityTable">
                <colgroup>
                    <col className='col1'/>
                    <col className='col2'/>
                    <col className='col3'/>
                </colgroup>
                <thead>
                    <tr>
                        <th id="topRow" colSpan="3">Tasks to do:</th>
                    </tr>
                    <tr>
                        <th>Task</th>
                        <th>Estimated Time</th>
                        <th>Finished?</th>
                    </tr>
                </thead>
                <tbody>
                {isError === true && <tr>
                            <td colSpan="3">Error: {error}</td>
                        </tr>}
                        {isError === false && loading === true && <tr>
                            <td colSpan="3">Loading...</td>
                        </tr>}
                        {isError === false && loading === false && taskData && Object.keys(taskData).length > 0 && tableRows}
                        {isError === false && loading === false && (!taskData || Object.keys(taskData).length === 0) && <tr><td colSpan="4">No tasks available.</td></tr>}
                </tbody>
            </table>
            <button type="button" id="buttonButton" onClick={handleEdit}>Remove Checked Boxes</button>
            <div>
                {isError && error}
            </div>
        </section>
        <section>
            <h3>Calendar</h3>{/*The calendar will be a 3rd party service call*/}
            <table>
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>9</td>
                        <td>10</td>
                        <td>11</td>
                        <td>12</td>
                        <td>13</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td>15</td>
                        <td>16</td>
                        <td>17</td>
                        <td>18</td>
                        <td>19</td>
                        <td>20</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>22</td>
                        <td>23</td>
                        <td>24</td>
                        <td>25</td>
                        <td>26</td>
                        <td>27</td>
                        <td>28</td>
                    </tr>
                    <tr>
                        <td>29</td>
                        <td>30</td>
                        <td>31</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
  );
}