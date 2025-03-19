import React, {useState, useEffect} from 'react';
import './login.css';
import { data, useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import { SignUpPage } from './SignUpPage/SignUpPage';

export function Login({setAuthState, authState, setAuthCode, authCode, setButtonText, userData, setUserData}) {
  const [authStatus,setAuthStatus] = useState(() => { 
    const auth = localStorage.getItem("authState");
    return auth ? JSON.parse(auth) : {authCode:'',authState:''};
  });
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpPageClick = () => {
    navigate("/SignUpPage");
  };

  async function handleLogin(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    if (response?.status === 200) {
      localStorage.setItem('username', username);
      setAuthState(response.authState);
      setButtonText("Welcome " + response.username + "!");
      navigate("/Home");
    } else {
      const body = await response.json();
      setError(`Error: ${body.msg}`);
      setIsError(true);
    }
  }

  async function handleSubmit(){
    setIsError(false);
    setError('');
    if (username === '' || password === ''){
      setError('Please enter a username and password');
      setIsError(true);
      return;
    }
    else {
      handleLogin(`/api/auth/login`);
    };
  };

  return (
    <main>
        <p>Please login below</p>
        <section id="login">
            <form>
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="loginText" name="username" placeholder="Username" value={username} onChange={handleUsername}/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="loginPassword" name="password" placeholder="Password" value={password} onChange={handlePassword}/><br/>
                <button type="submit" onClick={() => handleSubmit()}>Login</button>
            </form>
            <div>
              {isError && error}
            </div>
            <p>Don't have an account? Create one <a id="signUplink" onClick={handleSignUpPageClick}>here</a></p>
        </section>
    </main>
  );
}