import React, {useState, useEffect} from 'react';
import './login.css';
import { data, useNavigate } from 'react-router-dom';
import {nanoid} from 'nanoid';
import { SignUpPage } from '../SignUpPage/SignUpPage';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import { SignUpPage } from './SignUpPage/SignUpPage';

export function Login() {
  const [authStatus,setAuthStatus] = useState(() => { 
    const auth = localStorage.getItem("authState");
    return auth ? JSON.parse(auth) : {authCode:'',authState:''};
  });
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [authCode,setAuthCode] = useState(authStatus?.authCode || '');
  const [authState,setAuthState] = useState(authStatus?.authStatus  || '');
  const [userData, setUserData] = useState(() => {
    const storedTable = localStorage.getItem("userData");
    return storedTable ? JSON.parse(storedTable) : [];
  });
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

  const handleSubmit = (e) => {
    setIsError(false);
    setError('');
    e.preventDefault();
    if (username === '' || password === ''){
      setError('Please enter a username and password');
      setIsError(true);
      return;
    }

    const dataIndex = userData.findIndex(data => data.username === username);
    if (userData.length > 0 && dataIndex === -1){
      setError('Incorrect username');
      setIsError(true);
      return;
    }
    else {
      if (userData[dataIndex].password !== password){
        setError('Incorrect password');
        setIsError(true);
        return;
      }
      else{
        setAuthCode(nanoid());
        setAuthState("Authenticated");
        updateAuthCode();
      };
    };
    
    navigate("/Home");
  };

  const updateAuthCode = () => { 
      setUserData((userData) => {
        const indexNew = userData.findIndex((u) => u.username === username);
        if (indexNew !== -1){
          const newUserData = [...userData];
          newUserData[indexNew] = {
            ...newUserData[indexNew],
            authCode: authCode,
          };
          return newUserData;
        };
        return userData;
      });
    };

  useEffect(() => {
    if (authCode !== '' && authState === "Authenticated"){
      localStorage.setItem("authState",JSON.stringify({authStatus:authState,authCode:authCode}));
      localStorage.setItem("userData",JSON.stringify(userData))
    };
  },[userData, username, authCode, authState]);

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
            <div>
              {isError && error}
            </div>
            <p>Don't have an account? Create one <a id="signUplink" onClick={handleSignUpPageClick}>here</a></p>
        </section>
    </main>
  );
}