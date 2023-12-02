import './Login.css';
import { getAuth } from 'firebase/auth';
import localStorage from "use-local-storage";
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence, browserLocalPersistence, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();
function Login(){
    const[theme, setTheme]= localStorage('theme' ? 'dark' : 'light');
    const [toggleIcon, setToggleIcon]= useState('fa fa-toggle-off');
    const [themeText, setThemeText]= useState('Light');
    const switchTheme = ()=> {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setThemeText(newTheme === 'dark' ? 'Dark': 'Light');
        newTheme === 'dark'? setToggleIcon('fa fa-toggle-on'): setToggleIcon('fa fa-toggle-off')
    }

    const[email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const handleSignIn= async(e)=>{
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then( ()=>{      
            //console.log(userCredentials)
            auth.onAuthStateChanged( function(user){
                console.log(user.displayName)
                setPersistence(auth, browserLocalPersistence)
                .then(function(){
                    window.location.href = "./dashboard";
                })
            })
        })
        .catch( ()=>{
            console.error();
        });

    }
    const resetPassword= async (e)=>{
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            console.log(error)
        });
    }
    return (
        <div className="login-toggle" data-theme={theme}>
            <div className='login'>
                <h1>Login</h1>
                <div className='container'>
                    <div className='top'>
                        <i className='fab fa-google'></i>
                        <i className='fab fa-facebook-square'></i>
                        <i className='fab fa-linkedin'></i>
                        <i className='fab fa-twitter-square'></i>
                        <i className='fab fa-apple'></i>
                    </div>
                    <p className='divider'><span>Or</span></p>
                    <form onSubmit={handleSignIn}>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <button className="login-btn" type='submit'>Log In</button>
                    </form>
                    <div className='bottom'>
                        <div id="forgot" onClick={resetPassword}>Forgot password?</div>
                    </div>
                    <a id="signUp" href="/signup" style={{textDecoration: 'none'}}><p className='create'>Create account</p></a>
                </div>
                <div className='theme-toggle'>
                    <h2>{themeText} theme</h2>
                    <i onClick={switchTheme} className={toggleIcon}></i>
                </div>
            </div>
        </div>
    );
}
export default Login;