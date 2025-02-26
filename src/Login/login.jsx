import React, {useState, useEffect} from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { SignUpPage } from '../SignUpPage/SignUpPage';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import { SignUpPage } from './SignUpPage/SignUpPage';

export function Login() {
  const [authStatus,setAuthStatus] = useState(() => { 
    const auth = localStorage.getItem("authState");
    return auth ? JSON.parse(auth) : '[]';
  });
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [authCode,setAuthCode] = useState(authStatus.authCode);
  const [authState,setAuthState] = useState(authStatus.authStatus);
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpPageClick = (e) => {
    navigate("/SignUpPage");
  };

  const handleSubmit = () => {
    navigate("/Home");
  };

  useEffect(() => {
    if (authState === "Authenticated" && authCode){
      navigate("/Home");
    }
    else {
      navigate('/');
    }
  },[]);
  return (
    <main>
        <p>Please login below</p>
        <section id="login">
            <form>
                <label htmlFor="username">Username</label><br/>
                <input type="text" id="loginText" name="username" placeholder="Username" value={username} onChange={handleUsername}/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="loginPassword" name="password" placeholder="Password" value={password} onChange={handlePassword}/><br/>
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <p>Don't have an account? Create one <a id="signUplink" onClick={handleSignUpPageClick}>here</a></p>
        </section>
    </main>
  );
}