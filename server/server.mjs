// Import necessary packages
import mongoose from 'mongoose';
import express from 'express';
import Redis from 'ioredis'; // Import the Redis client
import { createRequire } from 'module';
import fs from 'fs';
import {Read, CreateNewWardrbe, UpdateWardrbe, GenerateOutfit} from './database.mjs';
import cors from 'cors';
import dotenv from 'dotenv/config'; // even tho its gray its needed
const MONGOURI = process.env.MONOGODB;
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
// create new wardrobe
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
// update wardrobe
app.post('/api/wardrobe/update', async (req, res) => {
  try {
    const { newItem, userId } = req.body;
    console.log('got the request');
    const result = await UpdateWardrbe(newItem, userId);
    console.log('updated wardrobe');
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to update the wardrobe" });
    }
  } catch (error) {
    console.error("Error updating the wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// generate an outfit
app.get('/api/wardrobe/generate-outfit', async (req, res) => {
  try {
    const weather = JSON.stringify(req.query.weather);
    const userId = JSON.stringify(req.query.userId);
    console.log("API Has been Called:",req.query.weather, req.query.userId);
    let outfit = 0;
    // console.log('typeof',typeof weather)

    if(weather != undefined & userId != undefined){
      outfit = await GenerateOutfit(weather, userId);
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
// fetch wardrbe
app.get('/api/fetchWardrbe', async (req, res) => {
  try {
    console.log(req.query.userID);
    const userID = req.query.userID;
    const wardrbe = await Read(userID);
    
    if (wardrbe) {
      res.status(200).json({ wardrbe });
      console.log('Wardrobe Fetched!', wardrbe);
    } else {
      res.status(500).json({ error: "Failed to fetch wardrobe" });
    }
  } catch (error) {
    console.error("Error fetching wardrobe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// delete item from wardrbe
app.post('/api/wardrobe/delete-item', async (req, res) => {
  try {
    const { item, userId } = req.body;
    console.log('Deleting item'+ item);
    const result = await UpdateWardrbe(item, userId);
    console.log('Deleted item!');
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete item" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// delete wardrbe
app.post('/api/wardrobe/delete-wardrbe', async (req, res) => {
  try {
    const { userId } = req.body;
    console.log('Deleting wardrbe'+ userId);
    const result = await UpdateWardrbe(userId.userId);
    console.log('Deleted wardrbe!');
    if (result) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete wardrbe" });
    }
  } catch (error) {
    console.error("Error deleting wardrbe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});