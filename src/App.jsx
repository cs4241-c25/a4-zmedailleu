import React from 'react'
import { useState } from 'react'
import Title from './components/Title.jsx'
import GameForm from './components/GameForm.jsx'
import GameTable from './components/GameTable.jsx'
import LoginPage from './LoginPage.jsx'

function App() {
    const x = 1;
    if (x === 1) {
        return (
            <div className="d-flex flex-column align-items-center">
                <Title />
                <div className="row">
                    <GameForm />
                    <GameTable />
                </div>
            </div>
        )
    }
    else {
        return (
            <LoginPage />
        )
    }
}

export default App
