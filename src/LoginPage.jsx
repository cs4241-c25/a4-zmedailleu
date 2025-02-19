import React from 'react';
import { useState } from 'react'
import axios from 'axios';
function LoginPage({setCurrentUser}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allUsers = await axios.get("/getusers");
        const data = allUsers.data;
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            if (username === data[i].username && password === data[i].password) {
                localStorage.setItem("currentUser", username);
                setCurrentUser(username);
                break;
            }
        }

    }

    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Login for Game Completion Tracker</h1>
            <form className="border border-3 p-3" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label><br/>
                <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/><br/><br/>
                <label htmlFor="password">Password: </label><br/>
                <input type="text" id="password" name="password"  onChange={(e) => setPassword(e.target.value)}/><br/><br/>
                <button id="loginbutton">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
