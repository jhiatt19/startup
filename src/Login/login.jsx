import React, {useState, useEffect} from 'react';
import './login.css';
import { data, useNavigate } from 'react-router-dom';

export function Login({setUsername, username, setButtonText, setAuthState}) {
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

  async function handleLogin() {
    console.log(username);
    const response = await fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    if (response?.status == 200){
      const res = await response.json();
      console.log(res);
      setButtonText("Welcome " + res.user + "!");
      setAuthState(res.authState);
      setUsername(res.user);
      navigate("/Home");
    }
    else {
      const body = await response.json();
      setError(`Error: ${body.msg}`);
      setIsError(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setError('');
    if (username === '' || password === ''){
      setError('Please enter a username and password');
      setIsError(true);
      return;
    }
    else {
      return handleLogin(`/api/auth/login`);
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