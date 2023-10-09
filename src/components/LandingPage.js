import './LandingPage.css';

function LandingPage() {

  return (
    <section className="landingPage">
      <div className='logo'>dressr</div>
      <div className="welcome">
        We think of  the weather<br/>so you don't have to...
      </div>
      <div className="button">
        <a href='./login'><button id="start-btn">Get started</button></a>
        <a href='./wardrbe'><button id='wardrbe'>wardrbe</button></a>
      </div>
    </section>
  );
}

export default LandingPage;
