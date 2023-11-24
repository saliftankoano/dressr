/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from 'react';
import { UserWardrbe, Item } from './WardrbeBackend.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import './styles.css';
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

class createId {
	constructor(id){
		this.userId = id;
	}
}
async function fetchWardrbe(userID) {
	try {
		// console.log(userID);
		const response = await axios.get('http://localhost:4000/api/fetchWardrbe', {
			headers: {
				'Content-Type': 'application/json',
			},
			params: userID,
			});
		console.log(response);

		if (response.status === 200) {
			if (response.data.wardrbe) {
				console.log('Wardrobe fetched successfully');
				return response.data.wardrbe;
			} else {
				console.error('Failed to fetch the wardrobe');
			}
		} else {
		console.error('Request failed with status:', response.status);
		}
	} catch (error) {
		console.error('Error fetching the wardrobe:', error);
	}
	return null;
}
function DisplayWardrbe(userID) {
	// console.log(`display wardrbe caled with userid ${userID.userID}`)
	const [wardrobeData, setWardrobeData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// const userId = new createId(userID.userID);
		fetchWardrbe(userID.userID).then(data => {
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
async function updateWardrbe(newItem, userId) {
	try {
		const response = await axios.post('http://localhost:4000/api/wardrobe/update', {
			newItem,
			userId
			}, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
		const data = response.data;
		if (data.success) {
			console.log('Wardrobe updated successfully');
		} else {
			console.error('Failed to update the wardrobe');
		}
		} else {
		console.error('Request failed with status:', response.status);
		}
	} catch (error) {
		console.error('Error updating the wardrobe:', error);
	}
}
function Wardrbe() {
	const [itemName, setItemName] = useState('');
	const [itemColor, setItemColor] = useState('');
	const [itemSize, setItemSize] = useState('');
	const [itemType, setItemType] = useState('');
	const [itemSeason, setItemSeason] = useState('');
	const [itemGender, setItemGender] = useState('');
	const [itemPhoto, setItemPhoto] = useState(null);
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
	return (
	<> 
	<a href='./dashboard'><button id='outfit'>Home</button></a>
	<Container className='full'>
		<Row>
			<Col xs='6'>
				<h1>Enter Item Data</h1>
				<form onSubmit={(e) => {
					e.preventDefault(); // Prevent the default form submission behavior
					updateWardrbe(new Item(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto), new createId(userID));
				}}>

				{/* Name */}
				<div>
					<h2 htmlFor="itemName">Item Name:</h2><br/>
					<input
						type="text"
						id="itemName"
						value={itemName}
						onChange={(e) => setItemName(e.target.value)}
						required
					/>
				</div>

				{/* Color */}
				<div>
					<h2 htmlFor="itemColor">Color:</h2><br/>
					<input
						type="text"
						id="itemColor"
						value={itemColor}
						onChange={(e) => setItemColor(e.target.value)}
						required
					/>
				</div>

				{/* Size */}
				<div>
					<h2>Size:</h2>
					<div>
						<input
						type="radio"
						id="small"
						name="itemSize"
						value="small"
						checked={itemSize === "small"}
						onChange={(e) => setItemSize(e.target.value)}
						required
						/>
						<label htmlFor="small">Small</label>
					</div>
					<div>
						<input
						type="radio"
						id="medium"
						name="itemSize"
						value="medium"
						checked={itemSize === "medium"}
						onChange={(e) => setItemSize(e.target.value)}
						required
						/>
						<label htmlFor="medium">Medium</label>
					</div>
					<div>
						<input
						type="radio"
						id="large"
						name="itemSize"
						value="large"
						checked={itemSize === "large"}
						onChange={(e) => setItemSize(e.target.value)}
						required
						/>
						<label htmlFor="large">Large</label>
					</div>
					<div>
						<input
						type="radio"
						id="xlarge"
						name="itemSize"
						value="xlarge"
						checked={itemSize === "xlarge"}
						onChange={(e) => setItemSize(e.target.value)}
						required
						/>
						<label htmlFor="xlarge">X-Large</label>
					</div>
				</div>

				{/* Item Type */}
				<div>
					<h2>Item Type:</h2>
					<div>
						<input
						type="radio"
						id="hats"
						name="itemType"
						value="hats"
						checked={itemType === "hats"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="hats">Hats</label>
					</div>
					<div>
						<input
						type="radio"
						id="tops"
						name="itemType"
						value="tops"
						checked={itemType === "tops"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="tops">Tops</label>
					</div>
					<div>
						<input
						type="radio"
						id="bottoms"
						name="itemType"
						value="bottoms"
						checked={itemType === "bottoms"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="bottoms">Bottoms</label>
					</div>
					<div>
						<input
						type="radio"
						id="layers"
						name="itemType"
						value="layers"
						checked={itemType === "layers"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="layers">Layers</label>
					</div>
					<div>
						<input
						type="radio"
						id="footwear"
						name="itemType"
						value="footwear"
						checked={itemType === "footwear"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="footwear">Footwear</label>
					</div>
					<div>
						<input
						type="radio"
						id="accessories"
						name="itemType"
						value="accessories"
						checked={itemType === "accessories"}
						onChange={(e) => setItemType(e.target.value)}
						required
						/>
						<label htmlFor="accessories">Accessories</label>
					</div>
				</div>

				{/* Season - no option for multiseason? - could use checkbox*/}
				<div>
					<h2>Season:</h2>
					{/* <div>
						<input
						type="radio"
						id="spring"
						name="itemSeason"
						value="spring"
						checked={itemSeason === "spring"}
						onChange={(e) => setItemSeason(e.target.value)}
						required
						/>
						<label htmlFor="spring">Spring</label>
					</div> */}
					<div>
						<input
						type="radio"
						id="summer"
						name="itemSeason"
						value="summer"
						checked={itemSeason === "summer"}
						onChange={(e) => setItemSeason(e.target.value)}
						required
						/>
						<label htmlFor="summer">Summer</label>
					</div>
					<div>
						<input
						type="radio"
						id="spring-fall"
						name="itemSeason"
						value="spring-fall"
						checked={itemSeason === "spring-fall"}
						onChange={(e) => setItemSeason(e.target.value)}
						required
						/> <label htmlFor="spring-fall">Spring / Fall</label>
					</div>
					<div>
						<input
						type="radio"
						id="winter"
						name="itemSeason"
						value="winter"
						checked={itemSeason === "winter"}
						onChange={(e) => setItemSeason(e.target.value)}
						required
						/>
						<label htmlFor="winter">Winter</label>
					</div>
				</div>

				{/* Gender */}
				<div>
					<h2>Gender:</h2>
					<div>
						<input
							type="radio"
							id="masc"
							name="itemGender"
							value="masc"
							checked={itemGender === "masc"}
							onChange={(e) => setItemGender(e.target.value)}
							required
						/><label htmlFor="masc">Masc</label>
					</div>
					
					<div>
						<input
							type="radio"
							id="fem"
							name="itemGender"
							value="fem"
							checked={itemGender === "fem"}
							onChange={(e) => setItemGender(e.target.value)}
							required
						/><label htmlFor="fem">Fem</label>
					</div>
					<div>
						<input
							type="radio"
							id="unisex"
							name="itemGender"
							value="unisex"
							checked={itemGender === "unisex"}
							onChange={(e) => setItemGender(e.target.value)}
							required
						/><label htmlFor="unisex">Unisex</label>
					</div>
				</div>

				{/* Photo */}
				<div>
				<h2 htmlFor="itemPhoto">Photo:</h2><br/>
				<input
					type="file"
					id="itemPhoto"
					accept="image/*"
				//   required
				/>
				</div>

				{/* Submit */}
				<div>
					<button type="submit">Submit</button>
				</div>
				</form>
				{/* only allow "save" button when theres >=1 item saved */}
			</Col>
			<Col xs='6'> {/* Display Wardrbe */}
			{userID ? <DisplayWardrbe userID={userID}></DisplayWardrbe> : <h1>Loading</h1>}
				
			</Col>
		</Row>
	</Container>

	</>
	);
}

export default Wardrbe;