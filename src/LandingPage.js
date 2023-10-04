import './LandingPage.css';
// import banner_img from './assets/banner.png'
function LandingPage() {
  
  return (
    <section className="landingPage">
      <div className="logo">DRESSR</div>
      <div className="welcome">
        We think of  the weather<br/>so you don't have to...
      </div>
      <div className="button">
        <button id="start-btn" onClick={animationStart}>Get Started</button>
      </div>
      
      <div className="popup">
        <div className="close-btn" onClick={animationClose}>&times;</div>
        <div className="form">
          <h2>Log in</h2>
          <div className="form-element">
            <label for="email" style={{color: "black"}}>Email</label>
            <input type="text" id="email" placeholder="Enter email"/>
          </div>
          <div className="form-element">
            <label for="password" style={{color: "black"}}>Password</label>
            <input type="password" id="password" placeholder="Enter password"/>
          </div>
          <div className="form-element">
            <input type="checkbox"id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <div className="form-element">
            <button id="btn-sign">Sign in</button>
          </div>
          <div className="form-element">
            <a href="./">Forgot password?</a>
          </div>
        </div>
      </div>
      {/* <script src="animation-started.js"></script> */}
    </section>
  );
}

function animationStart(){
  document.querySelector("#start-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active")
  });
}
function animationClose(){
  console.log("Bingo we got action: in Animation close!");
  document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active")
  });
}
export default LandingPage;
