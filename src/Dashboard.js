import './Dashboard.css';
import Toggle from './Toggle';
import {useState} from "react";
function Dashboard(){
    const [toggle, setToggle]= useState(false);
    const handleToggle = ()=>{
        setToggle(!toggle);
    };
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
            <Toggle toggle={toggle} handleToggle={handleToggle}/>
        </div>
    );
}
export default Dashboard;