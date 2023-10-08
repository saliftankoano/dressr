import './Login.css';
import localStorage from "use-local-storage";
import { useState } from 'react';

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
                    <form>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email'/>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password'/>
                        <div className='remember'>
                            <input type='checkbox' checked='checked'/>
                            <p>Remember Me</p>
                        </div>
                        <button>Log In</button>
                    </form>
                    <div className='bottom'>
                        <p>Forgot password?</p>
                        <a href='./'>Reset password</a>
                    </div>
                    <p className='create'>Create account</p>
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