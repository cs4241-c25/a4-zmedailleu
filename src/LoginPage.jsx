import React from 'react';
import { useState } from 'react'
function LoginPage() {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Login for Game Completion Tracker</h1>
            <form className="border border-3 p-3">
                <label htmlFor="username">Username: </label><br/>
                <input type="text" id="username" name="username"/><br/><br/>
                <label htmlFor="password">Password: </label><br/>
                <input type="text" id="password" name="password"/><br/><br/>
                <button id="loginbutton">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
