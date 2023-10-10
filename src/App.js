import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from "./components/LandingPage.js";
import Dashboard from "./components/Dashboard.js"
import Login from "./components/Login.js";
import Wardrbe from "./components/wardrbe.js";

function App(){
    return (
        <div>
            {/** BrowserRouter and Routes allow us to move between pages witout rendering the entire page again */}
            <BrowserRouter>
                <Routes>
                    {/* When testing a page Remove the path & add the index attribute to that element alone */}
                    <Route index element={<LandingPage/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                    <Route path= '/wardrbe' element={<Wardrbe/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
