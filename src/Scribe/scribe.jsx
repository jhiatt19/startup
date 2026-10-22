import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import "../all.css";
import "./scribe.css"

export function Scribe(){
    const [subject, setSubject] = useState('');
    const [scribeType,setScribeType] = useState('');

    const handleScribeType = (e) => {
        setScribeType(e.target.value);
    }

    const handleSubject = (e) => {
        setSubject(e.target.value);
    };

    return (
    <main>
        <div id='not-recording'>
            <section>
                <h2>Barnaby: AI Scribe</h2>
            </section>
            <section id='scribe-form-creator'>
                <label htmlFor="scribe-label">Subject:</label>
                <input type='text' id='scribe-subject' name='subject' value={subject} onChange={handleSubject}/>
                <br/>
                <label htmlFor="scribe-type">Which Scribe?</label>
                <select id='scribe-type' name='scribe-type' onChange={handleScribeType} value={scribeType}>
                    <option value="" disabled selected hidden>Select the scribe type</option>
                    <option value='medical'>Medical Scribe -- HIPPA compliant</option>
                    <option value='school'>School Scribe -- Note taker</option>
                    <option value='personal-assistant'>Personal Assistant -- General Scribe</option>
                </select>
                <br/>
                <button id='scribe-submit' type='submit'>Begin Recording</button>
            </section>
        </div>
        <div id='recording'>
            <section>
                <h2>Barnaby: {scribeType}</h2>
            </section>
            <section>
                <h3>Currently Recording</h3>
            </section>
        </div>
    </main>
    );
}