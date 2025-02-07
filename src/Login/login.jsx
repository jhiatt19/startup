import React from 'react';
import './login.css';

export function Login() {
  return (
    <main>
        <p>Please login below</p>
        <section id="login">
            <form action="html/Home.html">
                <label for="username">Username</label><br/>
                <input type="text" name="username" placeholder="Username"/><br/>
                <label for="password">Password</label><br/>
                <input type="password" name="password" placeholder="Password"/><br/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? Create one <a href="/html/SignUpPage.html">here</a></p>
        </section>
    </main>
  );
}