import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './all.css';

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

// function findLocation(){
//         const location = useLocation();
//         const hideNavBarPages = ['/', '/SignUpPage'];
//         const hideNavBar = hideNavBarPages.includes(location.pathname);
//         return hideNavBar;
// }

export default function App(){

    const handleLogOut = () => {
        const navigate = useNavigate();
        const userData = JSON.parse(localStorage.getItem("userData"));
        const code = JSON.parse(localStorage.getItem("authCode"));
        if (code === ''){
            navigate('/');
        }
        else {
            userData.map((data,authCode) => {
                if (data.authCode === authCode){
                    return {...data,authCode:''};
                }
                else {
                    return data;
                }
            });
        };
        localStorage.setItem("userData",userData);
    }
    
    

    return ( 
        <BrowserRouter>
            <div>
            <header>
                <NavLink to='./Home'><form action='./Home'>
                    <button id="profile">Welcome, user!</button>
                </form></NavLink>
                <NavLink to='./'><h1>Won Stop</h1></NavLink>
                <NavLink to='./'><form action='./'>
                    <button id="logOut" onClick={handleLogOut}>Log out</button>
                </form></NavLink>
            </header>
            {/* {findLocation() && <NavigationBar />} */}
            <NavigationBar />
            <main>
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/PDFextractor' element={<PDFextractor />} />
                    <Route path='/ProductivityCalendar' element={<ProductivityCalendar />} />
                    <Route path='/Calendar' element={<Calendar />} />
                    <Route path='/Alarms' element={<Alarms />} />
                    <Route path='/URLholder' element={<URLholder />} />
                    <Route path='/SignUpPage' element={<SignUpPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            <footer>
                <span id="authorName">Author Name(s): Jordan Hiatt</span>
                <NavLink id="github"to="https://github.com/jhiatt19/startup">Github</NavLink>
            </footer>
        </div>
    </BrowserRouter>
    )
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }