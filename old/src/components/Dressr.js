import React, { useState } from 'react';
import { UserWardrbe, Item, Weather, algo } from './WardrbeBackend.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import './styles.css'
const wardrbe = new UserWardrbe(); // blank wardrbe - should be populated with user's wardrbe

function updateWardrbe(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto){ // handles invalid item submissions
	console.log('updateWardrbe called');
	let newItem = new Item(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto);
	console.log(newItem);

	wardrbe.add(newItem);
	return null;
}

function DisplayWardrbe(){
	return (
    <div>
      <h2>Wardrobe</h2>
      {Object.keys(wardrbe).map((category) => ( //
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {wardrbe[category].map((item, index) => (
              <li key={index}>
                {item.name}: {item.color}, {item.season}, {item.size}, {item.type}, {item.season}, {item.gender}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Function to handle form submission

const Wardrbe = () => {
	// create new default wardrbe for user
	// const wardrbe = new UserWardrbe();
	// function for fetching a user's wardrbe should populare wardrbe object

	// Define state variables to store user inputs
	const [itemName, setItemName] = useState('');
	const [itemColor, setItemColor] = useState('');
	const [itemSize, setItemSize] = useState('');
	const [itemType, setItemType] = useState('');
	const [itemSeason, setItemSeason] = useState('');
	const [itemGender, setItemGender] = useState('');
	const [itemPhoto, setItemPhoto] = useState(null);
  
	return (
	<> 
	<Container>
	<Row>
	<Col xs='6' className='left'>
		<h1>Enter Item Data</h1>
		<form onSubmit={(e) => {
			e.preventDefault(); // Prevent the default form submission behavior
			updateWardrbe(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto);
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
	{/* saved items */}
	<Col xs='6'>
	<div>
		<h1>Saved Items</h1>
		<DisplayWardrbe></DisplayWardrbe>
		{/* <img src="https://media.gq.com/photos/6153752c430fd1b65067ee50/16:9/w_1280,c_limit/GettyImages-1195887867.jpeg"></img> */}
	</div>
	</Col>
	</Row>
	</Container>

	</>
	);
};

export default Wardrbe;