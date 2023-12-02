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

	if (error) {
		return <div>{error}</div>;
	}

	if (!wardrobeData) {
		return  <img src={loading} alt="loading" />;
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
    const[userId, setuserId]= useState("");
	
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
		<Row className='logoRow ignore-row-css'> {/* Logo & Bar */}
		<div className='logo'>
			<a href='/dashboard'>
				<img src='src/assets/logo.png' alt='logo'/>
			</a>
		</div>
		</Row>
		<Row className='ignore-row-css'> {/* Outfits & "Filters" */}
			<Col xs={10} className='outfit p-4 m-4'> {/* Outfit */}
				{/* {userId ? <DisplayWardrobe userId={userId}></DisplayWardrobe> :  <img src={loading} alt="loading" />} */}
			</Col>
			<Col xs={2} className='settings p-4 m-4'> {/* "Filter" */}
				<Row className='row colors p-2 m-2'>
					colors
				</Row>
				<Row className='row fabric p-2 m-2'>
					fabric
				</Row>
				<Row className='row style p-2 m-2'>
					style
				</Row>
			</Col>
		</Row>
	</Container>
    </>
    )
}

export default Outfit;