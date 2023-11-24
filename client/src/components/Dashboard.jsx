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
    
    const[fullName, setFullName]= useState('Alexa');
    const[userID, setUserId]= useState("");

    auth.onAuthStateChanged(  function(user) {
        if (user) {
          // User is signed in.
            setFullName(user.displayName);
            setUserId(user.uid);
            console.log(userID);
            //   console.log(fullName);
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
                <a href='./wardrbe'><button id='wardrbe' className='dash-btns'>Wardrbe</button></a>
                <a href='./outfit'><button id='outfit' className='dash-btns'>Outfits</button></a>
                <a href="./weather"><button id='weather' className='dash-btns'>Weather</button>
                </a>
            </div>
            
        </div>
    );
}
export default Dashboard;