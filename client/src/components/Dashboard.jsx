import './Dashboard.css';
import React, { useState } from "react";
import {auth} from '../firebase';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import Avatar from '@mui/material/Avatar'
import { useNavigate } from "react-router-dom";

// const auth = getAuth();

function Dashboard(){
    const navigate = useNavigate();

    const[userName, setuserName]= useState('');
    const[userImageUrl, setUserImageUrl]= useState('https://cdn.vectorstock.com/i/1000x1000/71/90/blank-avatar-photo-icon-design-vector-30257190.webp')
    window.onload = function(){
        auth.onAuthStateChanged(  function() {
            if (auth.currentUser) {
                setPersistence(auth, browserSessionPersistence);
                // console.log("User signed in: "+auth.currentUser);
                setuserName(auth.currentUser.displayName);
                // console.log(auth.currentUser.displayName);
                setUserImageUrl(auth.currentUser.photoURL)
            }
            else{
                navigate('/login');
                console.error("No user detected!");
            }
        });
    }
    
    return (
        <div className="dashboard">
            <div className='firstLine'>
                <Avatar alt='user pic' src={userImageUrl} sx={{ width: 150, height: 150 }}/>
                <div className="logo">DRESSR</div>
            </div>
            <div className="userName">
                Hello,<br/>{userName}
            </div>
            <div className="buttons">
                <a href='./wardrbe'><button id='wardrbe' className='dash-btns'>Wardrobe</button></a>
                <a href='./outfit'><button id='outfit' className='dash-btns'>Outfits</button></a>
                <a href="./weather"><button id='weather' className='dash-btns'>Weather</button>
                </a>
            </div>
            
        </div>
    );
}
export default Dashboard;