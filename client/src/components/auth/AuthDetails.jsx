import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {useEffect, useState} from "react";
import auth from "../../firebase";
function AuthDetails() {
    const [authUser, setAuthUser] = useState(null);
    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user)=>{
            if(user){
                setAuthUser(user)
                console.log(user)
            }
            else{
                setAuthUser(null)
            }
        });
        
        return()=>{
            listen()
        }
    }, []);

    const userSignOut = ()=>{
         signOut(auth).then(
            ()=>{
                console.log("Sign out Succesfull")
            }).catch(error =>console.log(error));
    }
  return (
    <div>
      {authUser? <><p>Signed in as {authUser.email}</p> <button onClick={userSignOut}>Sign Out</button></>: <p>Signed out</p>}
    </div>
  );
}

export default AuthDetails;
