import React, {useState, useRef, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';
import './signupPage.css';

const initialUsername = 'Username';
const initialEmail = 'Enter your email';
export function SignUpPage({setButtonText, userData, setUserData}) {
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);;
  const [objectAdded,setObjectAdded] = useState(false);
  const [authCode,setAuthCode] = useState('');

  const handleBlurUser = () => {
    if (username === ''){
        setUsername(initialUsername);
    }
  };
  const handleBlurEmail = () => {
    if (email === ''){
      setEmail(initialEmail);
    }
  }; 

  const handleFocusUser = () => {
    if (username === initialUsername){
      setUsername('');
    }
  };

  const handleFocusEmail = () => {
    if (email === initialEmail){
      setEmail('');
    }
  };

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
    setUsername(initialUsername);
    setPassword('');
    setEmail(initialEmail);
    setIsError(false);
  };

  const handleSubmit = (e) => {
    setIsError(false);
    setError('');
    e.preventDefault();
    if (username === initialUsername || password === ''){
      setError('Please enter a username and password');
      setIsError(true);
      return;
    }
    const userNameTaken = JSON.parse(localStorage.getItem("userData" || '[]'));

    if (userNameTaken !== '' && userNameTaken.some((data => data.username === username))){
      setError('Username already taken, please provide another one');
      setIsError(true);
      return;
      };
    setAuthCode(nanoid());
    setObjectAdded(false);
    setButtonText("Welcome " + username + "!");
    navigate("/Home");
  };

  //&& username !== initialUsername && password !== ''

  useEffect(() => {
    if(authCode !== '' && !objectAdded){
      if (email !== initialEmail && email !== ''){
        setUserData([...userData, {username:username,password:password,email:email, authCode:authCode}]);
      }
      else {
        setUserData([...userData, {username:username,password:password,email:'', authCode:authCode}]);
      }
    };
    setObjectAdded(true);
  }, [userData, username, password, email, authCode,]);

  useEffect(() => {
    localStorage.setItem("userData",JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("authState",JSON.stringify({username:username,authStatus:"Authenticated",authCode:authCode}));
  },[authCode]);

  return (
    <main>
        <section id="sign up">
            <form action="/Home">
                <label htmlFor="username">Username</label><br/>
                <input type="text" value={username} onBlur={handleBlurUser} onFocus={handleFocusUser} onChange={handleUsername} required/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" value={password} placeholder="Password" onChange={handlePassword} required/><br/>
                <label htmlFor="email">Email (Optional)</label><br/>
                <input type="email" value={email} onBlur={handleBlurEmail} onFocus={handleFocusEmail} onChange={handleEmail}/><br/>
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
