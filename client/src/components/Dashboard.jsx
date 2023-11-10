import './Dashboard.css';
import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from '../firebase';
import { collection, getDocs } from "firebase/firestore"; 
import auth from "../firebase"

const db = getFirestore(app);
const colRef = collection(db, "users");    
getDocs(colRef)
    .then((snapshot)=>{
        let users = [];
        snapshot.docs.forEach((doc)=>{
            users.push( {...doc.data().firstName, id: doc.id,})
        })
        console.log(users)
    })
    .catch(error=>{
        console.log(error.message)
    })

function Dashboard(){
    // getData();
    const[fullName, setFullName]= useState('Alexa');
    const[userID, setUserId]= useState('');
    auth.onAuthStateChanged(  function(user) {
        if (user) {
          // User is signed in.
          setFullName(user.displayName);
          // This user ID can be used for integration with the second database with the wardrobe
          setUserId(user.uid);
          // console.log(fullName);
        }
      });
    return (
        <div className="dashboard">
            <div className='firstLine'>
                <div className="profilePic"></div>
                <div className="logo">DRESSR</div>
            </div>
            <div className="userName">
                Hello,<br/>{fullName}
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