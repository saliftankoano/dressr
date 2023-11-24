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

async function GenerateOutfit(userId) {// hardcoded weater
	const [wardrobeData, setWardrobeData] = useState(null);	

        const weather = new Weather(11375);
		// console.log(weather)
		// console.log(weather, userID)
		userId = new createId(userId); //hardcoded user

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
                setWardrobeData(response.data.outfit);
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
    return DisplayWardrbe(wardrobeData);
}
/*
ISSUE:
the api seems to be recieving thing as a string, which is an issue!
it's unable to get userid.userid to read the wardrbe

things need to be standardized
*/
function DisplayWardrbe(wardrobeData) {
	return (
		<div>
		<h2>Your Outfit!</h2>
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
				{userID ? <GenerateOutfit userID={userID}></GenerateOutfit> : <h1>Loading</h1>}
			</Col>
		</Row>
	</Container>
    </>
    )
}

export default Outfit;