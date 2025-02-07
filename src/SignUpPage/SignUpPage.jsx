import React from 'react';
import './signupPage.css';

export function SignUpPage() {
  return (
    <main>
        <section id="sign up">
            <form action="/Home">
                <label id="uname" for="username">Username</label><br/>
                <input type="text" name="username" placeholder="Username"/><br/>
                <label for="password">Password</label><br/>
                <input type="password" name="password" placeholder="Password"/><br/>
                <label for="email">Email (Optional)</label><br/>
                <input type="email" name="email" placeholder="Enter your email"/><br/>
                <button type="reset">Reset</button>
                <button type="Submit">Submit</button>
            </form>
        </section>
    </main>
  );
}