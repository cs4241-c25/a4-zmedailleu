import React, {useEffect} from 'react'
import { useState } from 'react'
import Title from './components/Title.jsx'
import GameForm from './components/GameForm.jsx'
import GameTable from './components/GameTable.jsx'
import LoginPage from './LoginPage.jsx'

function App() {
    const x = 1;
    const [currentUser, setCurrentUser] = useState(null);
    window.localStorage.setItem("currentUser", "Kramer");

    // useEffect(() => {
    //     const loggedInUser = window.localStorage.getItem("currentUser");
    //     if(loggedInUser !== null) {
    //         setCurrentUser(loggedInUser);
    //     }
    // }, [])
    // console.log("currentuser equals", currentUser);
    // console.log(currentUser === null);


    if (currentUser === null) {
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
