// Import necessary packages
import express from 'express';
import Redis from 'ioredis'; // Import the Redis client
import { createRequire } from 'module';
import fs from 'fs';

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

// server!
// THIS IS STARTER CODE
app.get('/api', async (req, res) => {
  try {
    // Check if the data is in Redis cache
    const cachedData = await redis.get('cachedData');

    if (cachedData) {
      // If data is in cache, return it
      res.json(JSON.parse(cachedData));
    } else {
      // If data is not in cache, fetch it (e.g., from a database)
      const data = {
        "users": ["user1", "user2", "user3"]
      };

      // Store the data in Redis cache for future use
      await redis.set('cachedData', JSON.stringify(data));

      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});