import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard"
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup"
import AuthDetails from "./components/auth/AuthDetails";

function App(){
    return (
        <div>
            {/** BrowserRouter and Routes allow us to move between pages witout rendering the entire page again */}
            <BrowserRouter>
                <Routes>
                    {/* When testing a page Remove the path & add the index attribute to that element alone */}
                    <Route index element={<LandingPage/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/signup' element={<Signup/>} />
                    <Route path='/details' element={<AuthDetails/>} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
