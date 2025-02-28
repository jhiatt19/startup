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
const check = localStorage.getItem("authState")
if (check === ''){
    localStorage.setItem("authState",JSON.stringify({username:'',authCode:'',authStatus:''}));
};
export default function App(){
    const initalText = "Continue as Guest"
    const [userData, setUserData] = useState(() => {
        const storedTable = localStorage.getItem("userData");
        return storedTable ? JSON.parse(storedTable) : [];
      });
    const [buttonText,setButtonText] = useState(initalText);
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        const authstate = JSON.parse(localStorage.getItem("authState"))
        setUserData((userData) => {
            const indexNew = userData.findIndex((u) => u.authCode === authstate.authCode);
            if (authstate.username === 'Guest'){
                const newUserData = userData.filter(
                    (user) => user.authCode !== userData[indexNew].authCode
                );
                return newUserData;
            }
            else {
                if (indexNew !== -1){
                const newUserData = [...userData];
                newUserData[indexNew] = {
                    ...newUserData[indexNew],
                    authCode: '',
                };
                return newUserData;
                };
                return userData;
            };
        });
        setButtonText("Continue as Guest");
        localStorage.setItem("authState",JSON.stringify({username:'', authCode:'', authStatus:"Not Authenticated"}));
    };

    useEffect(() => {
        localStorage.setItem("userData",JSON.stringify(userData));
        const authenticated = userData.authCode;
        if (authenticated !== ''){
            localStorage.setItem("authState",JSON.stringify({username:userData.username, authCode:authenticated, authStatus:"Authenticated"}));
        }
        else {
            localStorage.setItem("authState",JSON.stringify({username:userData.username, authCode:authenticated, authStatus:"Not Authenticated"}));
        }
    },[userData]);

    const handleHome = () => {
        const authCheck = JSON.parse(localStorage.getItem("authState"));
        if (authCheck.authStatus === "Authenticated" && authCheck.authCode !== ''){
          navigate("/Home");
        }
        else {
          navigate('/');
        }
      };
    
    const handleGuest = () => {
        const token = nanoid();
        localStorage.setItem("authState",JSON.stringify({username:"Guest", authCode:token, authStatus:"Authenticated"}));
        setButtonText("Welcome Guest!");
        setUserData([...userData, {username:"Guest", authCode:token}]);
        navigate("/home");
    }

    function handleAuth(){
        const authCheck = JSON.parse(localStorage.getItem("authState"));
        if (authCheck.authStatus === "Authenticated" && authCheck.authCode !== ''){
            return true;
        }
        return false;
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
                <button id="logOut" onClick={handleLogOut}>Log out</button>
            </form>
            </NavLink> <br/>
        </header>
        {handleAuth() && <NavigationBar />}
        <main>
            <Routes>
                <Route path='/' element={<Login setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} exact />
                <Route path='/Home' element={<Home setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} />
                <Route path='/PDFextractor' element={<PDFextractor />} />
                <Route path='/ProductivityCalendar' element={<ProductivityCalendar />} />
                <Route path='/Calendar' element={<Calendar />} />
                <Route path='/Alarms' element={<Alarms />} />
                <Route path='/URLholder' element={<URLholder />} />
                <Route path='/SignUpPage' element={<SignUpPage setButtonText={setButtonText} userData={userData} setUserData={setUserData}/>} />
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