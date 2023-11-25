import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from "./components/LandingPage.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Login from "./components/auth/Login.jsx";
import Wardrbe from "./components/Wardrbe.jsx";
import Weather from "./components/Weather.jsx";
import Outfit from "./components/Outfits.jsx";
import Signup from "./components/auth/Signup.jsx"

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/wardrbe' element={<Wardrbe />} />
                <Route path='/weather' element={<Weather/>} /> 
                <Route path='/outfit' element={<Outfit/>} /> 
                <Route path='/signup' element={<Signup/>} />
                <Route path='/weather' element={<Weather/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
