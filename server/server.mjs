// Import necessary packages
import express from 'express';
import Redis from 'ioredis'; // Import the Redis client
import { createRequire } from 'module';
import fs from 'fs';
import {Read, CreateNewWardrbe, UpdateWardrbe, GenerateOutfit} from './database.mjs';

const app = express();
app.use(express.json());
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
function connectRedis(){
  redis.connect(getUri()).then(() => {
    console.log('New Redis Connection Setup!');
  }).catch(err => {
    console.error('Error connecting to Redis:', err);
  });
}
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
    const weather = JSON.parse(req.query.weather);
    const userId = JSON.parse(req.query.userId);
    let outfit = 0;

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
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// fetch wardrbe
app.get('/api/fetchWardrbe', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    const wardrbe = await Read(userId);
    
    if (wardrbe) {
      res.json({ wardrbe });
      console.log('Wardrobe Fetched!');
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