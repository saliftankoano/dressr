// Import necessary packages
import mongoose from 'mongoose';
import express from 'express';
import { createRequire } from 'module';
import fs from 'fs';
import {ReadWardrobe, ReadAllItemsFromWardrobe, ReadItem, SaveNewItem, UpdateItem, CreateNewWardrobe, UpdateWardrobe, GenerateOutfit, DeleteItem, DeleteWardrobe, ReadType} from './database.mjs';
import cors from 'cors';
import dotenv from 'dotenv/config'; // even tho its gray its needed
import axios from 'axios';
const MONGOURI = process.env.MONOGODB;
const WEATHER = process.env.WEATHER_API_KEY;
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;
const require = createRequire(import.meta.url); //not entirely sure what this does

// mongoDB! (database)
async function connectDB(){
  try{
    // console.log(MONGOURI)
    await mongoose.connect(MONGOURI);
    console.log("MongoDb Connected!");
  }
  catch(err){
    console.log("Unable to connect to MongoDb");
    // process.exit();
    console.error(err);
  }
};
connectDB();

// database api endpoints!
/**
 * create new wardrobe
 * @param {object} wardrobe
 * @param {string} userId
 */
app.post('/api/wardrobe/create', async (req, res) => {
  try {
    const { wardrobe, userId } = req.body;
    const result = await CreateNewWardrobe(wardrobe, userId);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to create a new wardrobe" });
    }
  } catch (error) {
    console.error("Error creating a new wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * updates wardrobe reference and saves new item
 * @param {object} newItem
 * @param {string} userId
 */
app.post('/api/wardrobe/update', async (req, res) => {
  try {
    const { newItem, userId } = req.body;
    const result = await SaveNewItem(newItem, userId);
    
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to update the wardrobe" });
      console.log("Failed to update the wardrobe");
    }
  } catch (error) {
    console.error("Error updating the wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * generates outfit based on weather
 * @param {object} weather
 * @param {string} userId 
 */
app.get('/api/wardrobe/generate-outfit', async (req, res) => {
  try {
    // console.log(req.query);
    const weather = (req.query.weather);
    const userId = (req.query.userId);
    // console.log(weather, userId);
    let outfit = 0;
    // console.log('typeof',typeof weather)

    // checks and gets outfit
    if(weather != undefined & userId != undefined){
      outfit = await GenerateOutfit(weather, userId);
    } else{
      console.log('weather or userId is undefined');
      res.status(500).json({ error: "Bad Request: userId or weather undefined" });
    }

    if (outfit) {
      res.json({ outfit });
    } else {
      res.status(500).json({ error: "Failed to generate an outfit" });
    }
  } catch (error) {
    console.error("Error generating an outfit:", error);
    res.status(500).json({ error: "Internal Server Error", error2: String(error) });
  }
});
/**
 * gets all items from wardrobe
 * @param {string} userId 
 * @returns {object} wardrobe
 */
app.get('/api/fetchWardrobe', async (req, res) => {
  try {
    // console.log(req.query.userId);
    const userId = req.query.userId;
    if(!userId){
      console.log('userId is undefined');
      res.status(500).json({ error: "Bad Request: userId undefined" });
    }

    const wardrobe = await ReadAllItemsFromWardrobe(userId);
    if (wardrobe) {
      res.status(200).json({ wardrobe });
      console.log('Wardrobe Fetched!');
    } else {
      res.status(500).json({ error: "Failed to fetch wardrobe" });
    }
  } catch (error) {
    console.error("Error fetching wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * gets all items from wardrobe
 * @param {string} userId 
 * @param {string} itemType 
 * @returns {object} wardrobe
 */
app.get('/api/fetchByType', async (req, res) => {
  try {
    // console.log(req.query.userId);
    const userId = req.query.userId;
    const itemType = req.query.itemType;
    if(!userId){
      console.log('userId is undefined');
      res.status(500).json({ error: "Bad Request: userId undefined" });
    }
    if(!itemType){
      console.log('itemType is undefined');
      res.status(500).json({ error: "Bad Request: itemType undefined" });
    }

    const items = await ReadType(userId, itemType);
    if (items) {
      res.status(200).json({ items });
      console.log('Items Fetched!');
    } else {
      res.status(500).json({ error: "Failed to fetch items" });
    }
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * deletes item from items collection (but not wardrobe)
 * @param {string} itemId 
 * @returns {boolean} success
 */
app.post('/api/wardrobe/delete-item', async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log('Deleting item'+ itemId);

    const result = await DeleteItem(itemId);
    if (result) {
      console.log('Deleted item!');
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete item" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/**
 * deletes wardrobe
 * @param {string} userId
 * @returns {boolean} success
 */
app.post('/api/wardrobe/delete-wardrobe', async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('Deleting wardrobe'+ userId);

    const result = await DeleteWardrobe(userId.userId);
    if (result) {
      console.log('Deleted wardrobe!');
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete wardrobe" });
    }
  } catch (error) {
    console.error("Error deleting wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Weather API
app.get('/api/weather', async (req, res) => {
  const zipcode = req.query.zipcode;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER}&q=${zipcode}&days=5&aqi=no`);
    res.json(response.data);
  } catch (err) {
      console.log("Weather API Error: ", err)
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});