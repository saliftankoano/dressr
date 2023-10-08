import './Toggle.css';

function Toggle({toggle, handleToggle}){
    
    return (
        <div className="container" onClick={handleToggle}>
            <div className={`toggleBtn ${ !toggle ? "disable": ""}`}>
                {toggle? "ON": "OFF"}
            </div>
        </div>
    );
}
export default Toggle;