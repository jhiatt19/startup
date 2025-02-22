import React from 'react';
import './signupPage.css';

export function SignUpPage() {
  return (
    <main>
        <section id="sign up">
            <form action="/Home">
                <label id="uname" htmlFor="username">Username</label><br/>
                <input type="text" name="username" placeholder="Username"/><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" name="password" placeholder="Password"/><br/>
                <label htmlFor="email">Email (Optional)</label><br/>
                <input type="email" name="email" placeholder="Enter your email"/><br/>
                <div className="signUpButtons">
                  <button type="reset" id='signButton'>Reset</button>
                  <button type="submit" id='signButton'>Submit</button>
                </div>
            </form>
        </section>
    </main>
  );
}