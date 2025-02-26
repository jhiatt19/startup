import React, {useState, useRef, useEffect} from 'react';
import './productivity.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ProductivityCalendar() {
    const [task,setTask] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState('');
    const timeRef = useRef(null);
    const priorityRef = useRef(null);
    const [taskData,setTaskData] = useState(() => {
        const storedTable = localStorage.getItem("taskData");
        return storedTable ? JSON.parse(storedTable) : [];
    });
    const [id,setId] = useState(taskData.length+1);

    const handlePriority = () => {
        if (priorityRef.current){
            setPriority(priorityRef.current.value);
        };
    };

    const handleTime = () => {
        if (timeRef.current){
            setTime(timeRef.current.value);
        };
    };

    const handleTask = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = () => {
        e.preventDefault();
        setTaskData([...taskData,[{task:task, time:time, priority:priority,id:id}]]);
        setTask('');
        setId(taskData.length+1);
    };

    useEffect(() => {
        localStorage.setItem("taskData",JSON.stringify(taskData));
    },[taskData]);

  return (
    <main>
        <section>
            <h3>Task Prioritizer</h3>
            <p>Another thing that I struggle with is determining what tasks to do at different times. Sometimes I spend more time coming up with a plan on when I will do all my tasks than actually doing the task. In this section I hope to create an algorithm to place tasks into my calendar based on priority and estimated time to complete task.</p>
        </section>
        <section>
            <h3 id="newtask">Add new task</h3>
            <form id="newTask" action="/ProductivityCalendar">
                <textarea className="form-control" id="task" rows="3" onChange={handleTask}></textarea>
                <label htmlFor="time" ref={timeRef} onChange={handleTime}>Estimated time:</label>
                <select id="times" name="time" value={time}>
                    <option>Choose ETA</option>
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option> 1 hour</option>
                    <option> 1.5 hours</option>
                    <option> 2 hours</option>
                    <option> 2.5 hous</option>
                    <option> 3 hours</option>
                    <option> 4 hours</option>
                    <option> 5 hours</option>
                    <option> 6 hours</option>
                    <option> 7 hours</option>
                    <option> 8 hours</option>
                    <option> All day</option>
                </select><br/>
                <label htmlFor="priority" ref={priorityRef} onChange={handlePriority}>Priority Level:</label>
                <select id="lvlpriority" name="priority" value={priority}>
                    <option>Choose priority level</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Extreme</option>
                </select><br/> {/*Any new tasks that are created will send an alert letting people know that another user has added tasks to there calendar.*/}
                <button id="buttonButton" type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
        <section>
            <table id="productivityTable">
                <thead>
                    <tr>
                        <th id="topRow" colSpan="3">Tasks to do:</th>
                    </tr>
                    <tr>
                        <th class="col1">Task</th>
                        <th class="col2">Estimated Time</th>
                        <th class="col3">Finished?</th>
                    </tr>
                    <tbody>
                    {taskData.map((data,id) => 
                        <tr key={id}>
                            <td><a href={data.task}>{data.task}</a></td>
                            <td>{data.time}</td>
                            <td><input className='checkBox' type="checkbox"/></td>
                        </tr>
                    )}
                    </tbody>
                    
                </thead>

                
            </table>
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