import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.css';
import {nanoid} from 'nanoid';

import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './Home/home';
import { Alarms } from './Alarms/Alarms';
import { Calendar } from './Calendar/Calendar';
import { Login } from './Login/login';
import { PDFextractor } from './PdFextractor/Pdfextractor';
import { ProductivityCalendar } from './ProductivityCalendar/ProductivityCalendar';
import { SignUpPage } from './SignUpPage/SignUpPage';
import { URLholder } from './URLholder/URLholder';

function NavigationBar(){
    return (
        <nav>
            <ul>
                <li><NavLink to='/home'>Home</NavLink></li>
                <li><NavLink to='/PDFextractor'>PDF Extractor</NavLink></li>
                <li><NavLink to='/ProductivityCalendar'>Productivity Calendar</NavLink></li>
                <li><NavLink to='/Calendar'>Calendar</NavLink></li>
                <li><NavLink to='/Alarms'>Alarms</NavLink></li>
                <li><NavLink to='/URLholder'>URL holder</NavLink></li>
            </ul>
        </nav>
    )
};

export default function App(){
    const initalText = "Continue as Guest"
    const [auth, setAuth] = useState(() => {
        const data = localStorage.getItem("authState");
        return data ? JSON.parse(data) : {username:'',authCode:'',authStatus:''};
    });
    const [authCode, setAuthCode] = useState(auth.authCode);
    const [authState,setAuthState] = useState(auth.authStatus);
    const [userData, setUserData] = useState(() => {
        const storedTable = localStorage.getItem("userData");
        return storedTable ? JSON.parse(storedTable) : [];
      });
    const [username,setUsername] = useState(userData.username || 'Guest');
    const [buttonText,setButtonText] = useState(initalText);
    const navigate = useNavigate();
    
    function handleLogOut(){
        const response = fetch('/api/auth/logout', {
            method: 'delete',
            headers: {
                'Content-type': 'application/json;',
                'Cookie': `token: ${authCode};`,
            }
        })
        if (response?.status === 200) {
            setAuthState(response.authState);
            setAuthCode('');
            navigate("/");
        } else {
            setError(`Error: ${CardBody.msg}`);
            setIsError(true);
        }
        
    };

    const handleHome = () => {
        if (authState === "Authenticated" && authCode){
          navigate("/Home");
        }
        else {
          navigate('/');
        }
      };
    
    const handleGuest = () => {
        setUsername("Guest-" + nanoid());
        const response = fetch('/api/auth/login', {
            method: 'post',
            body: JSON.stringify({username: username, password: "guest"}),
            headers: {
                'Content-type': 'application/json',
            }
        })
        if (response?.status === 200){
            localStorage.setItem('username',response.username);
            const plaintextResponse = response.json();
            setAuthCode(plaintextResponse.cookie.token);
            setAuthState(plaintextResponse.body.authState);
            setButtonText("Welcome Guest!");
            navigate("/home");
        }
        else {
            setError(`Error: ${body.msg}`);
            setIsError(true);
        }
        
        
    }
    return ( 
        <div>
        <header>
            <NavLink to='./Home'><form action='./Home'>
                <button id="profile" onClick={handleGuest}>{buttonText}</button>
            </form></NavLink>
            <h1><a id="homeNav" onClick={handleHome}>Won Stop</a></h1>
            <NavLink to='./'>
            <form>
                <button id="logOut" onClick={() => handleLogOut}>Log out</button>
            </form>
            </NavLink> <br/>
        </header>
        {authState === "Authenticated" && <NavigationBar />}
        <main>
            <Routes>
                <Route path='/' element={<Login setAuthState={setAuthState} setAuthCode={setAuthCode} authCode={authCode} setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} exact />
                <Route path='/Home' element={<Home setAuthState={setAuthState} authState={authState} setAuthCode={setAuthCode} authCode={authCode} setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} />
                <Route path='/PDFextractor' element={<PDFextractor />} />
                <Route path='/ProductivityCalendar' element={<ProductivityCalendar />} />
                <Route path='/Calendar' element={<Calendar />} />
                <Route path='/Alarms' element={<Alarms />} />
                <Route path='/URLholder' element={<URLholder />} />
                <Route path='/SignUpPage' element={<SignUpPage setAuthState = {setAuthState} setAuthCode={setAuthCode} authCode={authCode} setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
        <footer>
            <span id="authorName">Author Name(s): Jordan Hiatt</span>
            <NavLink id="github"to="https://github.com/jhiatt19/startup">Github</NavLink>
        </footer>
    </div>
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }