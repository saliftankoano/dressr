import ModalBody from 'react-bootstrap/esm/ModalBody';
import './styles.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Weather,createId } from './WardrbeBackend';
import { Container, Row, Col } from 'react-bootstrap';
import auth from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// gets userID
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
function DisplayWardrbe(userID) { // modify this to take input!
	const [wardrobeData, setWardrobeData] = useState(null);	

	useEffect(() => {
        const weather = new Weather(11375);
		// console.log(weather)
		// console.log(weather, userID)
		// const userId = new createId(27496); //hardcoded user
		GenerateOutfit(weather, userID)
		.then(data => {
			if (data) {
			console.log('Wardrobe fetched successfully', data);
			setWardrobeData(data);
			} else {
			console.error('Wardrobe Data Null!!');
			}
		})
		.catch(err => {
			console.error(err);
		});
	}, []); // Empty dependency array means this effect runs once after the initial render

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
	const[userID, setUserId]= useState("");
	
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
			setUserId(uid); // Set the user ID when the user is found
		})
		.catch(error => {
			console.error(error);
		});
	}, []);

	console.log('UserID:',userID);

    return(
    <>
    {/* Back Button */}
    <a href='./dashboard'><button id='outfit'>Home</button></a>

	<Container className='full'>
		<Row>
			{/* <Col>
				<div align="center">
					<h2>Outfits</h2>
					<button onClick={handleClick}>Generate Outfit!</button>
				</div>
			</Col> */}
			<Col>
				{userID ? <DisplayWardrbe userID={userID}></DisplayWardrbe> : <h1>Loading</h1>}
			</Col>
		</Row>
	</Container>
    </>
    )
}

export default Outfit;