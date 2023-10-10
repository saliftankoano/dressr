import React, { useState } from 'react';
// import * as module from './algo.js';
import { UserWardrbe, Item, Weather, algo } from './algo.js';

function updateWardrbe(item, userWardrbe){ // handles invalid item submissions
	let newItem = new module.item(item.name, item.color, item.size, item.type, item.season, item.gender);
	console.log(newItem);

	userWardrbe.add(newItem)
	return null;
}

function fetchWardrbe(){
	return null;
}

function displayWardrbe(){
	return null;
}

const Wardrbe = () => {
	// create new default wardrbe for user
	const wardrbe = new UserWardrbe();

	// Define state variables to store user inputs
	const [itemName, setItemName] = useState('');
	const [itemColor, setItemColor] = useState('');
	const [itemSize, setItemSize] = useState('');
	const [itemType, setItemType] = useState('');
	const [itemSeason, setItemSeason] = useState('');
	const [itemGender, setItemGender] = useState('');
	const [itemPhoto, setItemPhoto] = useState(null);
  
	// Function to handle form submission
	const handleSubmit = (e) => {
	  e.preventDefault();
  
	  // Create an object to store the item data
	  const item = {
		name: itemName,
		color: itemColor,
		size: itemSize,
		type: itemType,
		season: itemSeason,
		gender: itemGender,
		photo: itemPhoto,
	  };
  
	  // You can now send itemData to your server or perform any desired action.
	  console.log('Item Data:', item);
	};
  
	// Function to handle file input change
	const handleFileChange = (e) => {
	  const file = e.target.files[0];
	  setItemPhoto(file);
	};
  
	return (
	<> 
	<div>
		<h2>Enter Item Data</h2>
		<form onSubmit={handleSubmit}>
		  <div>
			<label htmlFor="itemName">Item Name:</label>
			<input
			  type="text"
			  id="itemName"
			  value={itemName}
			  onChange={(e) => setItemName(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemColor">Color:</label>
			<input
			  type="text"
			  id="itemColor"
			  value={itemColor}
			  onChange={(e) => setItemColor(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemSize">Size:</label>
			<input
			  type="text"
			  id="itemSize"
			  value={itemSize}
			  onChange={(e) => setItemSize(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemType">Type:</label>
			<input
			  type="text"
			  id="itemType"
			  value={itemType}
			  onChange={(e) => setItemType(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemSeason">Season:</label>
			<input
			  type="text"
			  id="itemSeason"
			  value={itemSeason}
			  onChange={(e) => setItemSeason(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemGender">Gender:</label>
			<input
			  type="text"
			  id="itemGender"
			  value={itemGender}
			  onChange={(e) => setItemGender(e.target.value)}
			  required
			/>
		  </div>
		  <div>
			<label htmlFor="itemPhoto">Photo:</label>
			<input
			  type="file"
			  id="itemPhoto"
			  accept="image/*"
			  onChange={handleFileChange}
			  required
			/>
		  </div>
		  <div>
			<button type="submit">Submit</button>
		  </div>
		</form>
	  </div>
	{/* <displayWardrbe></displayWardrbe> */}
		{/* <div> 
			<img src="https://hips.hearstapps.com/esq.h-cdn.co/assets/16/06/1024x768/sd-aspect-1455318985-derek-zoolander-wil-43.jpg?resize=1200:*"/>
			<img src="https://hips.hearstapps.com/elle/assets/16/05/1454862039-screen-shot-2016-02-07-at-105226-am.png"/>
		</div> */}
	</>
	);
};

export default Wardrbe;
