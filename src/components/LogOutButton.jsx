import React from "react";

function LogOutButton({setCurrentUser}) {

    function logUserOut() {
        localStorage.setItem("currentUser", "nobody")
        setCurrentUser("nobody");
    }

    return (
        <button onClick={logUserOut}>Log Out</button>
    )
}




export default LogOutButton