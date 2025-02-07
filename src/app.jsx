import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.css';

export default function App(){
    return <div className='app'>
        <header>
            <form action="/index.html">
                <button id="profile">Welcome, user!</button>
            </form>
            <h1>Won Stop</h1>
            <form action="/index.html">
                <button id="logOut">Log out</button>
            </form>
        </header>
        <nav>
            <ul>
                <li><a href="Home.html">Home</a></li>
                <li><a href="PDFextractor.html">PDF Extractor</a></li>
                <li><a href="ProductivityCalendar.html">Productivity Calendar</a></li>
                <li><a href="Calendar.html">Calendar</a></li>
                <li><a href="Alarms.html">Alarms</a></li>
                <li><a href="URLholder.html">URL holder</a></li>
            </ul>
        </nav>
        <main>Display main stuff here</main>
        <footer>
            <span id="authorName">Author Name(s): Jordan Hiatt</span>
            <a id="github"href="https://github.com/jhiatt19/startup">Github</a>
        </footer>
    </div>
}