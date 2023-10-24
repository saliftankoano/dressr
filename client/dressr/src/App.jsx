// import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Login from "./components/Login.jsx";
import Wardrbe from "./components/wardrbe.jsx";
import Weather from "./components/Weather.jsx";
import Dressr from "./components/Dressr.jsx";

const App = () => {
    return (
        <div>
            {/** BrowserRouter and Routes allow us to move between pages witout rendering the entire page again */}
            <BrowserRouter>
                <Routes>
                    {/* When testing a page Remove the path & add the index attribute to that element alone */}
                    <Route index element={<LandingPage/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                    <Route path='/wardrbe' element={<Wardrbe/>}/>
                    <Route path='/weather' element={<Weather/>}/>
                    <Route path='/' element={<Dressr/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;