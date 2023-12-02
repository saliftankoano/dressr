import './Signup.css';
import localStorage from "use-local-storage";
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { app,auth } from '../../firebase';
import { getFirestore, setDoc, doc} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import axios from 'axios';
import {UserWardrobe} from '../WardrobeBackend.js';


// FIREBASE AUTH
const db = getFirestore(app);

async function CreateWardrobe(userId){
    const wardrobe = new UserWardrobe();
    try {
        // Make a POST request to the create endpoint
        const response = await axios.post('http://localhost:4000/api/wardrobe/create', {
            wardrobe,
            userId
        });

        // Check if the request was successful
        if (response.data.success) {
            console.log("New User's Wardrobe created successfully");
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Failed to create wardrobe:', error.response.data.error);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}

function Signup(){
    //Toggle Button
    const[theme, setTheme]= localStorage('theme' ? 'dark' : 'light');
    const [toggleIcon, setToggleIcon]= useState('fa fa-toggle-off');
    const [themeText, setThemeText]= useState('Light');
    const switchTheme = ()=> {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setThemeText(newTheme === 'dark' ? 'Dark': 'Light');
        newTheme === 'dark'? setToggleIcon('fa fa-toggle-on'): setToggleIcon('fa fa-toggle-off')
    }
    const[firstName, setFirstName]= useState('');
    const[lastName, setLastName]= useState('');
    const[dob, setDbo]= useState('');
    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[profilePic, setProfilePic]= useState('');
    const[url, setUrl]= useState('');
    const[userId, setUserId]= useState('')

    function handleProfile(e){
        if(e.target.files[0]){
            setProfilePic(e.target.files[0]);
        }
    }
    async function writeToDB(userId) {
        try{
            await setDoc(doc(db, "users",""+email), {
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                email: email
                });
            window.location.href = "./dashboard";
        }
        catch(err){
            console.error("writeToDB failed. reason :", err)
        }
    };
    
    async function createAccount(e){
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUserId(user.uid);
        
            await updateProfile(user, {
              displayName: firstName,
              photoURL: url,
            });
            await CreateWardrobe(user.uid);
        
            console.log("User name: " + user.displayName);
        
            // Rest of your code...
        
            // Log the current user's display name after the authentication state is updated
            auth.onAuthStateChanged(function (user) {
              setPersistence(auth, browserSessionPersistence);
              console.log("Current User name: " + auth.currentUser.displayName);
            });
            const storage = getStorage();
            // Create a storage reference from our storage service
            const storageRef = ref(storage, `profiles/${auth.currentUser.uid}`);
            const metadata = { contentType: profilePic.type }; // Set the content type
            
            try{
                const snapshot = await uploadBytes(storageRef, profilePic, metadata);
                console.log("Uploaded a file: "+snapshot);
                const downloadUrl = await getDownloadURL(storageRef);
                // Update the user's photoURL
                await updateProfile(auth.currentUser, {
                    photoURL: downloadUrl,
                });
                // Write to the database
                writeToDB(userId);
            }
            catch(error){
                console.error('Error uploading file:', error);
            }
            
            writeToDB(userId);
        }catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + "  " + errorMessage);
          }

    
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
                        <label>Profile picture</label>
                        <input type='file' accept='image/*' onChange={handleProfile}/>
                        
                        <button id='signup-btn' type='submit'>Sign Up</button>
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