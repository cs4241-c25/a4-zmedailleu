import React, {useEffect} from 'react'
import { useState } from 'react'
import Title from './components/Title.jsx'
import GameForm from './components/GameForm.jsx'
import GameTable from './components/GameTable.jsx'
import LoginPage from './LoginPage.jsx'
import LogOutButton from "./components/LogOutButton";

function App() {
    const x = 1;
    const [currentUser, setCurrentUser] = useState("nobody");

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("currentUser");
        if(loggedInUser !== "nobody") {
            setCurrentUser(loggedInUser);
        }
    }, [])


    if (currentUser !== "nobody") {
        return (
            <div className="d-flex flex-column align-items-center">
                <Title />
                <div className="row">
                    <GameForm />
                    <GameTable />
                </div>
                <LogOutButton setCurrentUser={setCurrentUser}/>
            </div>
        )
    }
    else {
        return (
            <LoginPage setCurrentUser={setCurrentUser}/>
        )
    }
}

export default App
