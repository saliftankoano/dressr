import ModalBody from 'react-bootstrap/esm/ModalBody';
import './RafidTempStyle.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Weather,createId } from './WardrbeBackend';
import { useNavigate } from 'react-router-dom';

async function GenerateOutfit(weather, userId) {    
	try {
		const response = await axios.get('http://localhost:4000/api/wardrobe/generate-outfit', {
            params: {
				weather: JSON.stringify(weather),
				userId: JSON.stringify(userId)
			}
		});
        if (response.status === 200) {
            if (response.data.outfit) {
                console.log('Outfit generated successfully');
                return response.data.outfit;
            } else {
                console.error('Failed to generate outfit', response.data);
            }
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error generating outfit:', error);
        // Log the detailed request if error response is available
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
    }
    return null;
}
function DisplayWardrbe() { // modify this to take input!
	const [wardrobeData, setWardrobeData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
        const weather = new Weather(11369);
		const userId = new createId(27496); //hardcoded user
		GenerateOutfit(weather, userId)
		.then(data => {
			if (data) {
			console.log('Wardrobe fetched successfully', data);
			setWardrobeData(data);
			} else {
			console.error('Wardrobe Data Null!!');
			setError('Error Fetching Wardrobe!');
			}
		})
		.catch(err => {
			console.error(err);
			setError('Error Fetching Wardrobe!');
		});
	}, []); // Empty dependency array means this effect runs once after the initial render

	if (error) {
		return <div>{error}</div>;
	}

	if (!wardrobeData) {
		return <div>Loading...</div>;
	}

	return (
		<div>
		<h2>Wardrobe</h2>
		{Object.keys(wardrobeData).map(category => {
			if (Array.isArray(wardrobeData[category])) {
			return (
				<div key={category}>
				<h3>{category}</h3>
				<ul>
					{wardrobeData[category].map((item, index) => (
					<li key={index}>
						{item.name}: {item.color}, {item.season}, {item.size}, {item.type}, {item.season}, {item.gender}
					</li>
					))}
				</ul>
				</div>
			);
			}
			return null;
		})}
		</div>
	);
}

function Outfit(){
    const [showWardrobe, setShowWardrobe] = useState(false);
    function handleClick(){
        setShowWardrobe(!showWardrobe);
    }
    
    let navigate = useNavigate();
    function home() {
        navigate('/');
    }


    return(
    <>
    {/* Back Button */}
    <button onClick={home} className="btn btn-primary">
        Home
    </button>    

    <div align="center">
        <h2>Outfits</h2>
        <button onClick={handleClick}>Generate Outfit!</button>
    </div>
    {showWardrobe && 
        <div>
            <DisplayWardrbe></DisplayWardrbe>
        </div>
    }
    </>
    )
}

export default Outfit;