import { MongoClient, ObjectId } from 'mongodb';
const WARDRBE = 'wardrbe';
const ITEMS = 'items';
const DBNAME = 'dressr';
import dotenv from 'dotenv/config'; // even tho its gray its needed
const MONGOURI = process.env.MONOGODB;

// implement a tree that stores clothes in relation to one another
// this would make sorting through them and finding the optimal clothing item
// more efficent and reduce time complexity


/**
 * Item object that contains all the information about a clothing item.
 * @constructor(name, color, size, type, season, gender, photo) of clothing item
 */
export class Item{
    constructor(name, color, size, type, season, gender="all", photo){
        this.name = name;
        this.color = color;
        this.size = size;
        this.type = type; // type of clothing item
        this.season = season;
        this.gender = gender;
        this.photo = photo;
    }
    copyFrom(otherItem) {
        return new Item(
        otherItem.name,
        otherItem.color,
        otherItem.size,
        otherItem.type,
        otherItem.season,
        otherItem.gender,
        otherItem.photo
        );
    }
}
/**
 * User object that contains all the information about a user's wardrobe.
 * @constructor(userId) of user
 * @add(item) adds item to wardrobe
 */
export class UserWardrobe{
    constructor(userId) {
        this.hats = [];
        this.tops = [];
        this.bottoms = [];
        this.layers = [];
        this.footwear = [];
        this.accessories = [];

    }

    add(item, itemtype){
        console.log(item);

        switch(itemtype){
            case itemtype ="footwear":
                this.footwear.push(item);
                break;
            case itemtype ='layers':
                this.layers.push(item);
                break;
            case itemtype ='bottoms':
                this.bottoms.push(item);
                break;
            case itemtype ='tops':
                this.tops.push(item);
                break;
            case itemtype ='hats':
                this.hats.push(item);
                break;
            case itemtype ='accessories':
                this.accessories.push(item);
                break;
            default:
                console.log('Invalid Item Type:', item.type);
                break;
        }
        return null;
    }
    
}
/**
 * Fetches weather data from the Weather API.
 * @constructor (zipcode) of user
 * @returns {Object} Returns the weather data object if successful, or false if an error occurs.
 */
export class Weather{
    constructor(zipcode){ // presumably fetched from person object
        const weather = FetchWeather(zipcode);

        if (weather.feelslike_f >= 70) {
            this.season = 'summer';
        } else if (weather.feelslike_f <= 50) {
            this.season = 'winter';
        } else if (weather.feelslike_f > 50 || weather.feelslike_f < 70) {
            this.season = 'spring-fall';
        } else {
            this.season = 'spring-fall';
        }

        this.temp = weather.feelslike_f;
        this.windspeed = weather.wind_mph;
    };
}


/**
 * Reads user data from a MongoDB collection based on the provided userId.
 * 
 * @param {string} userId The unique identifier of the user.
 * @returns {Object|boolean} Returns the user data object if successful, or false if an error occurs.
 */
export async function ReadWardrobe(userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrbeDB = DB.collection(WARDRBE);

        const query = { userId: userId };
        const data = await wardrbeDB.findOne(query);

        client.close();

        return data;
    }catch(err){
        console.error("Couldn't read user data\n", err);
        return false;
    }
}
/**
 * does not work as intended
 * @param {*} userId 
 * @returns 
 */
export async function ReadAllItemsFromWardrobe(userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrbeDB = DB.collection(WARDRBE);

        const query = { userId: userId };
        const data = await wardrbeDB.findOne(query);

        client.close();

        return data;
    }catch(err){
        console.error("Couldn't read user data\n", err);
        return false;
    }
}
/**
 * 
 * @param {itemId} itemId 
 * @returns `item` object
 */
export async function ReadItem(itemId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const items = DB.collection(ITEMS);

        const query = { _id: new ObjectId(itemId)  };
        const data = await items.findOne(query);

        client.close();

        return data;
    }catch(err){
        console.error("Couldn't read user data\n", err);
        // client.close();
        return false;
    }
}
/**
 * Assumuing this is a completely unique item!
 * Saving a new item lets us get it's objectID which we can save into the user's wardrobe
 * @param {item} item object
 * @returns 
 */
export async function SaveNewItem(item, userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const items = DB.collection(ITEMS);

        const result = await items.insertOne(item);
        // should also be saved to the user's wardrobe
        const updatedWardrbe = await UpdateWardrobe(result.insertedId, item.type, userId);
        console.log(updatedWardrbe);

        client.close();
        if(result.acknowledged){
            console.log('Item saving success!', result.insertedId);
            return true;
        }
        console.log('Item saving failed!');
        return false;
    }catch(err){
        console.error("Couldn't save new item\n", err);
        return false;
    }

}
/**
 * 
 * @param {item} item 
 * @returns true if successful, false if not
 */
export async function UpdateItem(item){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const items = DB.collection(ITEMS);

        const query = { _id: item._id };
        const update = { $set: item};
        const options = { upsert: true }; // Creates a new document if no document matches the query

        await items.updateOne(query, update, options);

        client.close();
        console.log('Item saving success!')

        return true;
    }catch(err){
        console.error("Couldn't save new item\n", err);
        return false;
    }
}
/**
 * Creates a new wardrobe entry or updates an existing one in a MongoDB collection.
 * 
 * @param {Object} wardrobe - The wardrobe data to be stored.
 * @param {string} userId - The unique identifier of the user.
 * @returns {boolean} - Returns true if the operation is successful, or false if an error occurs.
 */
export async function CreateNewWardrobe(wardrobe, userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrbeDB = DB.collection(WARDRBE);

        // Insert or update the wardrobe object
        const query = { userId: userId };
        const update = { $set: { wardrobe: wardrobe }};
        const options = { upsert: true }; // Creates a new document if no document matches the query

        await wardrbeDB.updateOne(query, update, options);

        client.close();
        console.log('success!')

        return true;
    }catch(err){
        console.error("Couldn't create new wardrobe\n", err);
        return false;
    }
}
/**
 * Stores itemID into the user's wardrobe
 * @param {*} item 
 * @param {*} userId 
 * @returns 
 */
export async function UpdateWardrobe(item, itemtype, userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrobes = DB.collection(WARDRBE); 

        const wardrbeObject = await wardrobes.findOne({ userId: userId });
        if (!wardrbeObject) {
            console.error('Wardrobe not found!');
            return false;
        }

        switch(itemtype){
            case 'hats':
                wardrbeObject.wardrobe.hats.push(item);
                break;
            case 'tops':
                wardrbeObject.wardrobe.tops.push(item);
                break;
            case 'bottoms':
                wardrbeObject.wardrobe.bottoms.push(item);
                break;
            case 'layers':
                wardrbeObject.wardrobe.layers.push(item);
                break;
            case 'accessories':
                wardrbeObject.wardrobe.accessories.push(item);
                break;
            case 'footwear':
                wardrbeObject.wardrobe.footwear.push(item);
                break;
            default:
                console.error('Invalid Item Type!', item.type);
                return false;
        }

        const updateResult = await wardrobes.updateOne(
            { userId: userId },
            { $set: wardrbeObject }
        );

        client.close();

        if (updateResult.modifiedCount === 1) {
            console.log("Item Added to wardrobe", item);
            return true;
        } else {
            console.error('No document was updated.');
            return false;
        }
    } catch(err){
        console.error("Couldn't save new item to wardrobe\n", err);
        return false;
    }
}
/**
 * Outdated - does not call properly
 * @param {*} weather 
 * @param {*} userId 
 * @returns 
 */
export async function GenerateOutfit(weather, userId){
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length); //random index
        return arr[randomIndex];
    }
    // console.log(userId, weather);
    
    try{
        let wardrobe = await ReadWardrobe(userId);
        // console.log(userId)

        const modifiedWardrobe = new UserWardrobe();
        await modifiedWardrobe.initialized;

        const hats = [];
        const tops = [];
        const bottoms = [];
        const layers = []; // jackets, sweaters, etc.
        const footwear = [];
        const accessories = [];

        // console.log('Wardrobe', wardrobe);
        if(wardrobe){
            console.log("wardrobe is here")
        }

        for (let i = 0; i < wardrobe.footwear.length; i++) {
            const item = wardrobe.footwear[i];
            if (item.season === weather.season) {
                footwear.push(item);
            }
        }
        let footwearItem = getRandomElement(footwear);

        for (let i = 0; i < wardrobe.layers.length; i++) {
            const item = wardrobe.layers[i];
            if (item.season === weather.season) {
                layers.push(item);
            }
        }
        let layersItem = (getRandomElement(layers));

        for (let i = 0; i < wardrobe.tops.length; i++) {
            const item = wardrobe.tops[i];
            if (item.season === weather.season) {
                tops.push(item);
            }
        }
        let topsItem = (getRandomElement(tops));

        for (let i = 0; i < wardrobe.bottoms.length; i++) {
            const item = wardrobe.bottoms[i];
            if (item.season === weather.season) {
                bottoms.push(item);
            }
        }
        let bottomsItem =(getRandomElement(bottoms));

        for (let i = 0; i < wardrobe.hats.length; i++) {
            const item = wardrobe.hats[i];
            if (item.season === weather.season) {
                hats.push(item);
            }
        }
        let hatsItem = (getRandomElement(hats));

        for (let i = 0; i < wardrobe.accessories.length; i++) {
            const item = wardrobe.accessories[i];
            if (item.season === weather.season) {
                accessories.push(item);
            }
        }
        let accessoriesItem = (getRandomElement(accessories));

        modifiedWardrobe.add(footwearItem);
        modifiedWardrobe.add(layersItem);
        modifiedWardrobe.add(topsItem);
        modifiedWardrobe.add(bottomsItem);
        modifiedWardrobe.add(hatsItem);
        modifiedWardrobe.add(accessoriesItem);

        return modifiedWardrobe;
    }catch(err){
        console.error("Couldn't generate outfit!\n", err);
        return false;
    }
}
/**
 * Deletes item from {items} collection (not the reference in the user's wardrobe)
 * please add that
 * @param {*} userId 
 * @param {*} item 
 * @returns 
 */
export async function DeleteItem(userId, item){
    try{
        const wardrbeObject = await ReadWardrobe(userId.userId);

        switch(item.type){
            case 'hats':
                wardrobeObject['hats'] = wardrobeObject['hats'].filter((hatItem) => {
                // Compare each hatItem to the criteria to decide if it should be filtered out
                return !Object.entries(criteria).every(([key, value]) => 
                    hatItem[key] === value
                );
                });                
                break;
            case 'tops':
                wardrbeObject.tops.push(item);
                break;
            case 'bottoms':
                wardrbeObject.bottoms.push(item);
                break;
            case 'layers':
                wardrbeObject.layers.push(item);
                break;
            case 'accessories':
                wardrbeObject.accessories.push(item);
                break;
            case 'footwear':
                wardrbeObject.footwear.push(item);
                break;
            default:
                console.error('Invalid Item Type!', item.type);
                return false;
        }

        await redis.set(userId.userId, JSON.stringify(wardrbeObject, null, 2));
            console.log("Item Added!", item);
            return true;
        }catch(err){
            console.error("Couldn't save new item\n", err);
            return false;
        }
}
export async function DeleteWardrobe(userId){
    try{
        const result = await redis.del(userId);
        if (result == 0) {
        console.log(`userId '${userId}' deleted successfully.`);
        } else {
        console.log(`userId '${userId}' does not exist.`);
        }
    } catch (error) {
        console.error('Error deleting userId:', error);
    }

}
// 'example code on how to update and create wardrobes'
(async () => {
    // console.log(await Read())
    // await instance.initialized;
    // console.log(instance);

    const example = new Item('broken shirt', 'black', 'L', 'tops', 'spring-fall', 'all', 'https://i.imgur.com/1q2QX9o.jpg');
    // const read = await ReadItem("656102843b84df9bdac6ae2e");
    // read.color = 'orange';
    // await UpdateItem(read);
    // console.log(read);

    // const instance = new UserWardrbe();
    // instance.add('656102843b84df9bdac6ae2e', 'tops');
    await SaveNewItem(example, 'aZ6VfRixlwUlO0JWoBIKN7EE6if1');



    // await CreateNewWardrbe(instance, 'aZ6VfRixlwUlO0JWoBIKN7EE6if1');
    // await UpdateWardrbe();
    
    // const weather = { season: 'spring-fall' };
    // const userId = 27496;
    // GenerateOutfit(weather, userId).then((outfit) => {
    //     if (outfit) {
    //     console.log("Generated Outfit:", outfit);
    //     } else {
    //     console.log("Failed to generate outfit.");
    //     }
    // });
    // await DeleteWardrbe(96268);
})();