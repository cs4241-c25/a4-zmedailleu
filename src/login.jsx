import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import LoginPage from "./LoginPage";

createRoot(document.getElementById('loginRoot')).render(
    <LoginPage />
)
