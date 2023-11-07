import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Login from "./components/Login.jsx";
import Wardrbe from "./components/wardrbe.jsx";
import Weather from "./components/Weather.jsx";
import Outfit from "./components/Outfits.jsx";

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/wardrbe' element={<Wardrbe />} />
                <Route path='/weather' element={<Weather/>} /> 
                <Route path='/outfit' element={<Outfit/>} /> 
            </Routes>
        </BrowserRouter>
    );
}
export default App;
