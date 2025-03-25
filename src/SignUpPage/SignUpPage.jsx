import React, {useState, useRef, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';
import './signupPage.css';


export function SignUpPage({username, setUsername, setAuthState, setButtonText }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  }

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setIsError(false);
  };

  async function handleRegister() {
    console.log(username);
    const response = await fetch('/api/auth/create', {
      method: 'post',
      body: JSON.stringify({ username: username, password: password, email: email}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

    if (response?.status === 200){
      //console.log(response);
      const res = await response.json();
      //localStorage.setItem('username', JSON.stringify(res.username));
      setAuthState(res.authState);
      setButtonText("Welcome " + res.username + "!");
      setUsername(res.username);
      navigate("/Home");
    } else {
      const body = await response.json();
      setError(`Error: ${body.msg}`);
      setIsError(true);
    }
  
  }

  const handleSubmit = (e) => {
    setIsError(false);
    setError('');
    e.preventDefault();
    if (username === '' || password === ''){
      setError('Please enter a username and password');
      setIsError(true);
      return;
    }
    else {
      return handleRegister(`/api/auth/create`);
    }
  };

  //&& username !== initialUsername && password !== ''

  return (
    <main>
        <section id="sign up">
            <form action="/Home">
                <label htmlFor="username">Username</label><br/>
                <input type="text" value={username} placeholder="Username" onChange={handleUsername} required/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" value={password} placeholder="Password" onChange={handlePassword} required/><br/>
                <label htmlFor="email">Email (Optional)</label><br/>
                <input type="email" value={email} placeholder='Enter your email' onChange={handleEmail}/><br/>
                <div className="signUpButtons">
                  <button type="reset" id='signButton' onClick={handleReset}>Reset</button>
                  <button type="Submit" id='signButton' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            <div id="error">
              {isError && error}
            </div>
        </section>
    </main>
  );
}
