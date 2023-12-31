import ModalBody from 'react-bootstrap/esm/ModalBody';
// import './styles.css';
import './outfits.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Weather } from './WardrobeBackend';
import { Container, Row, Col } from 'react-bootstrap';
import auth from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import whiteshirt from '../assets/white-shirt.png';
import loading from '../assets/loading.gif';

// gets userId
const db = getFirestore(app);
const colRef = collection(db, "users");    
getDocs(colRef).then((snapshot)=>{
        let users = [];
        snapshot.docs.forEach((doc)=>{
            users.push( {...doc.data().firstName, id: doc.id,})
        })
    }).catch(error=>{
        console.log(error.message)
    })


async function GenerateOutfit(userId) {
	let wardrobeData = null;	
	const weather = new Weather(11375);
	// console.log('weather:', weather);	
	console.log('generate outfit userId:', userId, weather);	

	try {
		const response = await axios.get('http://localhost:4000/api/wardrobe/generate-outfit', {
            params: {
				weather: JSON.stringify(weather),
				userId: userId
			}
		});
        if (response.status === 200) {
            if (response.data.outfit) {
                console.log('Outfit generated successfully');
                wardrobeData = (response.data.outfit);
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
    return wardrobeData;
}
function DisplayWardrobe(userId) {
	console.log(`display wardrobe caled with userId ${userId.userId}`)
	const [wardrobeData, setWardrobeData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		GenerateOutfit(userId.userId).then(data => {
			if (data) {
				console.log('Wardrobe generated successfully', data);
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

	// catch errors
	if (error) {
		return <div>{error}</div>;
	}
	if (!wardrobeData) {
		return  <img src={loading} alt="loading" />;
	}
	if(wardrobeData['accessories'] == null|| wardrobeData['bottoms']== null || wardrobeData['footwear']== null || wardrobeData['tops']== null || wardrobeData['layers']== null || wardrobeData['hats']== null){
		return <div>Add more items to the wardrobe!!!</div>
	}

	return (
		<div>
		<h2>Generated Outfit</h2>
		{Object.keys(wardrobeData).map(category => {
			if (Array.isArray(wardrobeData[category])) {
			return (
				<div key={category}>
				<h3>{category}</h3>
				<ul>
					{wardrobeData[category].map((item, index) => (
					<li key={index}>
						{item.name}: {item.color}, {item.size}
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
    const[userId, setuserId]= useState("");
	const colors = ['red', 'green', 'blue', 'orange', 'purple'];
	const fabrics = ['cotton', 'wool', 'polyester', 'silk', 'leather'];
	const styles = ['casual', 'formal', 'business casual', 'athletic', 'business formal'];
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedFabric, setSelectedFabric] = useState('');
	const [selectedStyle, setSelectedStyle] = useState('');

	// Get the currently signed-in user
	useEffect(() => {
		const checkAuthState = () => {
			return new Promise((resolve, reject) => {
				const unsubscribe = onAuthStateChanged(auth, (user) => {
					unsubscribe(); // Unsubscribe immediately after receiving the user data
					if (user) {
						resolve(user.uid); // Resolve the promise with user ID
					} else {
						reject('No user found'); // Reject the promise
					}
				});
			});
		};
		checkAuthState()
			.then(uid => {
				setuserId(uid); // Set the user ID when the user is found
			})
			.catch(error => {
				console.error(error);
			});
		}, []);

    return(
    <>
	<Container fluid> {/* Complete Webpage */}
		<Row className='logoRow'> {/* Logo & Bar */}
		<div className='logo'>
			<a href='/dashboard'>
				<img src='src/assets/logo.png' alt='logo'/>
			</a>
		</div></Row>
		<Row className=''> {/* Outfits & "Filters" */}
			<Col xs={10} className='outfit p-4 m-2 ml-5'> {/* Outfit */}
				{userId ? <DisplayWardrobe userId={userId}></DisplayWardrobe> :  <img src={loading} alt="loading" />}</Col>
			<Col className='settings p-4 m-2'> {/* "Filter" */}
				<Row className='selectors colors p-4 mb-4'> {/* "Color" */}
					<p className='bigger'>colors</p>
					<form>
						<div className="color-options">
						{colors.map((color, index) => (
							<label key={index}>
							<input
								type="checkbox"
								name="color"
								value={color}
								checked={selectedColor === color}
								onChange={() => setSelectedColor(color)}
							/>
							<span
								className={`color-option ${color === 'green' ? 'green-check' : ''}`}
							></span>
							{color}
							</label>
						))}
						</div>
					</form>
				</Row>
				<Row className='selectors fabric p-4 mb-4'> {/* "Fabric" */}
					<p className='bigger'>fabric</p>
					<form>
						<div className="color-options">
						{fabrics.map((fabric, index) => (
							<label key={index}>
							<input
								type="checkbox"
								name="fabric"
								value={fabric}
								checked={selectedColor === fabric}
								onChange={() => setSelectedFabric(fabric)}
							/>
							<span
								className={`color-option ${fabric === 'green' ? 'green-check' : ''}`}
							></span>
							{fabric}
							</label>
						))}
						</div>
					</form>
				</Row>
				<Row className='selectors style p-4'> {/* "Style" */}
					<p className='bigger'>styles</p>
					<form>
						<div className="color-options">
						{styles.map((style, index) => (
							<label key={index}>
							<input
								type="checkbox"
								name="style"
								value={style}
								checked={selectedColor === style}
								onChange={() => setSelectedStyle(style)}
							/>
							<span
								className={`color-option ${style === 'green' ? 'green-check' : ''}`}
							></span>
							{style}
							</label>
						))}
						</div>
					</form>
				</Row></Col>
		</Row>
	</Container>
    </>
    )
}

export default Outfit;