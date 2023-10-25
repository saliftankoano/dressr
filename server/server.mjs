// Import necessary packages
import express from 'express';
import Redis from 'ioredis'; // Import the Redis client
import { createRequire } from 'module';
import fs from 'fs';
import {CreateNewWardrbe, UpdateWardrbe, GenerateOutfit} from './database.mjs';

const app = express();
const port = 4000;
const require = createRequire(import.meta.url); //not entirely sure what this does
const filePath = 'redisUri.json';

// redis! (database!)
const redis = new Redis();
redis.ping((err, result) =>{
  if(err){
    console.error("Error! No connection to redis!\n", err);
    connectRedis();
  }else{
    console.log("Connected to redis");
  }
});

function getUri() {
  try {
    const jsonContent = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(jsonContent);
    return config.uri;
  } catch (err) {
    console.error('Error reading or parsing the JSON file for Redis Uri\n', err);
    return null;
  }
}
function connectRedis(){
  redis.connect(getUri()).then(() => {
    console.log('New Redis Connection Setup!');
  }).catch(err => {
    console.error('Error connecting to Redis:', err);
  });
}

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
    const { item, userId } = req.body;
    const result = await UpdateWardrobe(item, userId);
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
app.post('/api/wardrobe/generate-outfit', async (req, res) => {
  try {
    const { weather, userId } = req.body;
    const outfit = await GenerateOutfit(weather, userId);
    if (outfit) {
      res.json({ outfit });
    } else {
      res.status(500).json({ error: "Failed to generate an outfit" });
    }
  } catch (error) {
    console.error("Error generating an outfit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});