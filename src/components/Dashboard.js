import './Dashboard.css';
import {useState} from "react";
function Dashboard(){
    
    return (
        <div className="">
            <div className='firstLine'>
                <div className="profilePic"></div>
                <div className="logo">DRESSR</div>
            </div>
            <div className="userName">
                Hello,<br/>Alexa
            </div>
            <div className="buttons">
                <div className="weatherBtn">
                    Weather
                </div>
                <div className="wardrobeBtn">
                    Wardrobe
                </div>
            </div>
            
        </div>
    );
}
export default Dashboard;