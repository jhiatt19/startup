import React from 'react';
import './login.css';
import { NavLink } from 'react-bootstrap';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import { SignUpPage } from './SignUpPage/SignUpPage';

export function Login() {
  return (
    //<BrowserRouter>
    <main>
        {/* <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/SignUpPage' element={<SignUpPage />} />
        </Routes> */}
        <p>Please login below</p>
        <section id="login">
            <form action="/Home">
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="loginText" name="username" placeholder="Username"/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="loginPassword" name="password" placeholder="Password"/><br/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? Create one <a id="signUplink" href='/SignUpPage'>here</a></p>
        </section>
    </main>
    //</BrowserRouter>
  );
}