import React from 'react';
import { useState } from 'react'
function LoginPage() {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Login for Game Completion Tracker</h1>
                <a href="/auth/github">
                    <button id="githubButton">Login with GitHub</button>
                </a>
        </div>
    )
}

export default LoginPage
