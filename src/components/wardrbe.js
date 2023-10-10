import React, { useState } from 'react';
// import * as module from './algo.js';
import { UserWardrbe, Item, Weather, algo } from './WardrbeBackend.js';
const wardrbe = new UserWardrbe();

function updateWardrbe(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto){ // handles invalid item submissions
	console.log('updateWardrbe called');
	let newItem = new Item(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto);
	console.log(newItem);

	wardrbe.add(newItem);
	return null;
}

function fetchWardrbe(){
	return null;
}

function displayWardrbe(){
	return null;
}
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
	<div>
		<h2>Enter Item Data</h2>
		<form onSubmit={(e) => {
		e.preventDefault(); // Prevent the default form submission behavior
		updateWardrbe(itemName, itemColor, itemSize, itemType, itemSeason, itemGender, itemPhoto);
		}}>
		
		{/* Name */}
		<div>
			<label htmlFor="itemName">Item Name:</label><br/>
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
			<label htmlFor="itemColor">Color:</label><br/>
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
			<label>Size:</label>
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
			<label>Item Type:</label>
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
			<label>Season:</label>
			<div>
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
			</div>
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
				id="fall"
				name="itemSeason"
				value="fall"
				checked={itemSeason === "fall"}
				onChange={(e) => setItemSeason(e.target.value)}
				required
				/>
				<label htmlFor="fall">Fall</label>
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
			<label>Gender:</label>
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
		<label htmlFor="itemPhoto">Photo:</label><br/>
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
	  </div>
	</>
	);
};

export default Wardrbe;
