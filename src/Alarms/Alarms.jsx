import React from 'react';
import './alarms.css';

export function Alarms() {
  return (
    <main>
        <h2>Alarms</h2>
        <section>
            <form>
                <label for="alarm-time">Set alarm time:</label>
                <input type="time" id="alarm-time" name="alarm-time"/>
                <br/><br/>
                <button type="submit">Set Alarm</button>/*Alarms will be handled by a 3rd party*/
                <br/>
            </form>
        </section>
        <section>
            <h3>Current Alarms</h3>
            <p>Alarm 1: 12:23 pm (33 minutes 27 seconds left)</p>
            <p>Alarm 2: 7:23 pm (7 hours 33 minutes 27 seconds left)</p>
        </section>
    </main>
  );
}