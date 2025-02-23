import React, {useState, useRef, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';
import './signupPage.css';

export function SignUpPage() {
  const initialUsername = 'Username';
  const initialEmail = 'Enter your email';
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [userData, setUserData] = useState(() => {
      const storedTable = localStorage.getItem("userData");
        return storedTable ? JSON.parse(storedTable) : [];
    });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [authCode,setAuthCode] = useState ('');
  const [takenUser,setTakenUser] = useState(false);

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

    if (userNameTaken.some((data => data.username === username))){
      setError('Username already taken, please provide another one');
      setIsError(true);
      return;
      };

    setAuthCode(nanoid());
    
    if (!isError){
      console.log(authCode);
      if (email !== initialEmail && email !== ''){
        setUserData([...userData, {username:username,password:password,email:email, authCode:authCode}]);
      }
      else {
        setUserData([...userData, {username:username,password:password,email:'', authCode:authCode}]);
      }
      setUsername(initialUsername);
      setPassword('');
      setEmail(initialEmail);
      localStorage.setItem("authCode",JSON.stringify(authCode));
      navigate("/Home");
    };
  };

  useEffect(() => {
    localStorage.setItem("userData",JSON.stringify(userData));
  }, [userData]);

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
