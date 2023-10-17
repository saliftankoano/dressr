import './Dashboard.css';
function Dashboard(){
    
    return (
        <div className="dashboard">
            <div className='firstLine'>
                <div className="profilePic"></div>
                <div className="logo">DRESSR</div>
            </div>
            <div className="userName">
                Hello,<br/>Alexa
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