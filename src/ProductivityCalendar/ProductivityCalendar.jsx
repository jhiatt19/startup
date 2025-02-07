import React from 'react';
import './productivity.css';

export function ProductivityCalendar() {
  return (
    <main>
        <section>
            <h3>Task Prioritizer</h3>
            <p>Another thing that I struggle with is determining what tasks to do at different times. Sometimes I spend more time coming up with a plan on when I will do all my tasks than actually doing the task. In this section I hope to create an algorithm to place tasks into my calendar based on priority and estimated time to complete task.</p>
        </section>
        <section>
            <h3>Add new task</h3>
            <form id="newTask" action="/ProductivityCalendar">
                <input type="text" id="task" placeholder="Task name"/><br/>
                <label for="time">Estimated time:</label>
                <select id="times" name="time">
                    <option value="choose">Choose ETA</option>
                    <option value="5min">5 minutes</option>
                    <option value="15min">15 minutes</option>
                    <option value="30min">30 minutes</option>
                    <option value="45min">45 minutes</option>
                    <option value="1hr"> 1 hour</option>
                    <option value="1.5hr"> 1.5 hours</option>
                    <option value="2hr"> 2 hours</option>
                    <option value="2.5hr"> 2.5 hous</option>
                    <option value="3hr"> 3 hours</option>
                    <option value="4hr"> 4 hours</option>
                    <option value="5hr"> 5 hours</option>
                    <option value="6hr"> 6 hours</option>
                    <option value="7hr"> 7 hours</option>
                    <option value="8hr"> 8 hours</option>
                    <option value="Allday"> All day</option>
                </select><br/>
                <label for="priority">Priority Level:</label>
                <select id="lvlpriority" name="priority">
                    <option value="choose">Choose priority level</option>
                    <option value="low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Extreme">Extreme</option>
                </select><br/> {/*Any new tasks that are created will send an alert letting people know that another user has added tasks to there calendar.*/}
                <button id="buttonButton" type="submit">Submit</button>
            </form>
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