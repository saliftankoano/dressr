import './Signup.css';
import localStorage from "use-local-storage";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../firebase"
import { app } from '../../firebase';
import { getFirestore, collection, addDoc} from "firebase/firestore";
const db = getFirestore(app);

function Signup(){
    const[theme, setTheme]= localStorage('theme' ? 'dark' : 'light');
    const [toggleIcon, setToggleIcon]= useState('fa fa-toggle-off');
    const [themeText, setThemeText]= useState('Light');
    const switchTheme = ()=> {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setThemeText(newTheme === 'dark' ? 'Dark': 'Light');
        newTheme === 'dark'? setToggleIcon('fa fa-toggle-on'): setToggleIcon('fa fa-toggle-off')
    }
    // FIREBASE AUTH
    const[firstName, setFirstName]= useState('');
    const[lastName, setLastName]= useState('');
    const[dob, setDbo]= useState('');
    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');

    function createAccount(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // console.log(userCredential);
            // Signed up 
            
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: firstName +" "+lastName, photoURL: "https://example.com/jane-q-user/profile.jpg"
              }).then(() => {
                // Profile updated!
                console.log("Name: "+user.displayName)
              }).catch((error) => {
                // An error occurred
                console.log(error)
              }
            );

            try {
                addDoc(collection(db, "users"), {
                    firstName: {firstName},
                    lastName: {lastName},
                    dob: {dob},
                    emal: {email}
                });
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }

            window.location.href = "./dashboard";
            
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode +"  "+ errorMessage);
        // ..
        });
    }

    return (
        <div className="login-toggle" data-theme={theme}>
            <div className='login'>
                <h1>Create Account</h1>
                <div className='container'>
                    <div className='top'>
                        <i className='fab fa-google'></i>
                        <i className='fab fa-facebook-square'></i>
                        <i className='fab fa-linkedin'></i>
                        <i className='fab fa-twitter-square'></i>
                        <i className='fab fa-apple'></i>
                    </div>
                    <p className='divider'><span>Or</span></p>
                    <form onSubmit={createAccount}>
                        <label>First name</label>
                        <input type='text' placeholder='Enter your first name' value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                        <label>Last name</label>
                        <input type='text' placeholder='Enter your last name' value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                        <label>Birth date</label>
                        <input type="date" id="start" name="trip-start" value={dob} onChange={(e)=> setDbo(e.target.value)}/>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
                <div className='theme-toggle'>
                    <h2>{themeText} theme</h2>
                    <i onClick={switchTheme} className={toggleIcon}></i>
                </div>
            </div>
        </div>
    );

}
export default Signup;