import { MongoClient, ObjectId } from 'mongodb';
const WARDROBE = 'wardrbe';
const ITEMS = 'items';
const DBNAME = 'dressr';
import dotenv from 'dotenv/config'; // even tho its gray its needed
import { json } from 'express';
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
 * @add(item, itemtype) adds item to wardrobe
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
        // console.log(item);

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
 * Returns references of items contained within the wardrobe.
 * 
 * @param {string} userId The unique identifier of the user.
 * @returns {Object|boolean} Returns the user data object if successful, or false if an error occurs.
 */
export async function ReadWardrobe(userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrbeDB = DB.collection(WARDROBE);

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
 * returns a wardrobe object with all of the items (not referenced!)
 * @param {string} userId 
 * @returns {object} populatedWardrobe
 */
export async function ReadAllItemsFromWardrobe(userId) {
    try {
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrobeDB = DB.collection(WARDROBE);

        const query = { userId: userId };
        let wardrobe = await wardrobeDB.findOne(query);
        client.close();

        if (!wardrobe) {
            console.error('Wardrobe not found!');
            return false;
        }

        const categories = ['hats', 'tops', 'bottoms', 'layers', 'accessories', 'footwear'];
        // Create a copy of the wardrobe object to avoid mutating the original while iterating
        let populatedWardrobe = JSON.parse(JSON.stringify(wardrobe));

        for (const category of categories) {
            if (populatedWardrobe.wardrobe[category]) {
                // Replace each reference with the actual item object
                for (let i = 0; i < populatedWardrobe.wardrobe[category].length; i++) {
                    const itemRef = populatedWardrobe.wardrobe[category][i];
                    const actualItem = await ReadItem(itemRef);
                    if (actualItem) {
                        populatedWardrobe.wardrobe[category][i] = actualItem;
                    } else {
                        console.error(`Item not found for reference: ${itemRef}`);
                    }
                }
            }
        }

        return populatedWardrobe;
    } catch (err) {
        console.error("Couldn't read user data\n", err);
        return false;
    }
}
/**
 * 
 * @param {string} itemId 
 * @returns {object} `item`
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
        console.error("Couldn't read item data\n", itemId, err);
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
 * `item` must include `_id` attribute
 * @param {object} item 
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
 * @param {object} wardrobe - The wardrobe data to be stored.
 * @param {string} userId - The unique identifier of the user.
 * @returns {boolean} - Returns true if the operation is successful, or false if an error occurs.
 */
export async function CreateNewWardrobe(wardrobe, userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrbeDB = DB.collection(WARDROBE);

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
 * @param {object} item 
 * @param {string} userId 
 * @returns 
 */
export async function UpdateWardrobe(item, itemtype, userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrobes = DB.collection(WARDROBE); 

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
 * Fetches weather data & randomly gets an item from the user's wardrobe based on the weather.
 * @param {object} weather 
 * @param {string} userId 
 * @returns {object} modifiedWardrobe
 */
export async function GenerateOutfit(weather, userId){
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length); //random index
        return arr[randomIndex];
    }
    // console.log(userId, weather);
    weather = JSON.parse(weather);
    
    try{
        let data = await ReadAllItemsFromWardrobe(userId);
        // console.log(data.wardrobe)

        const modifiedWardrobe = new UserWardrobe();
        await modifiedWardrobe.initialized;

        const hats = [];
        const tops = [];
        const bottoms = [];
        const layers = []; // jackets, sweaters, etc.
        const footwear = [];
        const accessories = [];
        if(!data.wardrobe){
            console.error('Wardrobe not found!');
        }


        for (let i = 0; i < data.wardrobe.footwear.length; i++) {
            const item = data.wardrobe.footwear[i];
            if (item.season === weather.season) {
                footwear.push(item);
            }
        }
        let footwearItem = getRandomElement(footwear);

        for (let i = 0; i < data.wardrobe.layers.length; i++) {
            const item = data.wardrobe.layers[i];
            if (item.season === weather.season) {
                layers.push(item);
            }
        }
        let layersItem = (getRandomElement(layers));

        for (let i = 0; i < data.wardrobe.tops.length; i++) {
            const item = data.wardrobe.tops[i];
            if (item.season === weather.season) {
                tops.push(item);
            }
        }
        let topsItem = (getRandomElement(tops));

        for (let i = 0; i < data.wardrobe.bottoms.length; i++) {
            const item = data.wardrobe.bottoms[i];
            if (item.season === weather.season) {
                bottoms.push(item);
            }
        }
        let bottomsItem =(getRandomElement(bottoms));

        for (let i = 0; i < data.wardrobe.hats.length; i++) {
            const item = data.wardrobe.hats[i];
            if (item.season === weather.season) {
                hats.push(item);
            }
        }
        let hatsItem = (getRandomElement(hats));

        for (let i = 0; i < data.wardrobe.accessories.length; i++) {
            const item = data.wardrobe.accessories[i];
            if (item.season === weather.season) {
                accessories.push(item);
            }
        }
        let accessoriesItem = (getRandomElement(accessories));

        modifiedWardrobe.add(footwearItem, 'footwear');
        modifiedWardrobe.add(layersItem, 'layers');
        modifiedWardrobe.add(topsItem, 'tops');
        modifiedWardrobe.add(bottomsItem, 'bottoms');
        modifiedWardrobe.add(hatsItem, 'hats');
        modifiedWardrobe.add(accessoriesItem, 'accessories');

        return modifiedWardrobe;
    }catch(err){
        console.error("Couldn't generate outfit!\n", err);
        return false;
    }
}
/**
 * Deletes item from {items} collection (not the reference in the user's wardrobe)
 * please add that
 * @param {string} itemId
 * @returns {boolean} bool - Returns true if the operation is successful, or false if an error occurs.
 */
export async function DeleteItem(itemId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const items = DB.collection(ITEMS);

        const result = await items.deleteOne({ _id: new ObjectId(itemId) });
        client.close();

        if (result.deletedCount === 1) {
            console.log("Item deleted successfully.");
            return true;
        } else {
            console.log("Item not found.");
            return false;
        }
    } catch (err) {
        console.error('Error deleting item:', err);
        return false;
    }
}
/**
 * Deletes based on the `usedId` attribute of wardrobe - not `_id`
 * @param {string} userId 
 * @returns {boolean} bool - Returns true if the operation is successful, or false if an error occurs.
 */
export async function DeleteWardrobe(userId){
    try{
        const client = new MongoClient(MONGOURI);
        await client.connect();
        const DB = client.db(DBNAME);
        const wardrobes = DB.collection(WARDROBE);

        const result = await wardrobes.deleteOne({ userId: userId });
        client.close();

        if (result.deletedCount === 1) {
            console.log("Wardrobe deleted successfully.");
            return true;
        } else {
            console.log("Wardrobe not found.");
            return false;
        }
    } catch (err) {
        console.error('Error deleting wardrobe:', err);
        return false;
    }
}
// 'example code on how to update and create wardrobes'
(async () => {
    // await DeleteItem(('656102843b84df9bdac6ae2e'))
    // console.log(await Read())
    // await instance.initialized;
    // console.log(instance);

    // const example = new Item('broken shirt', 'black', 'L', 'tops', 'spring-fall', 'all', 'https://i.imgur.com/1q2QX9o.jpg');
    // const read = await ReadItem("656102843b84df9bdac6ae2e");
    // console.log(read);
    // read.color = 'orange';
    // await UpdateItem(read);
    // console.log(read);

    // const instance = new UserWardrobe();
    // instance.add('656102843b84df9bdac6ae2e', 'tops');
    // await SaveNewItem(example, 'aZ6VfRixlwUlO0JWoBIKN7EE6if1');

    // await CreateNewWardrobe(new UserWardrobe('adsas'), 'asdasd');
    // await DeleteWardrobe('asdasd');

    // await ReadAllItemsFromWardrobe('klNGDRQB3IOD733IQDcUJJkOCVD3');
    // const result = await ReadAllItemsFromWardrobe('aZ6VfRixlwUlO0JWoBIKN7EE6if1');
    // console.log(result.wardrobe.tops);
    // await UpdateWardrobe();
    
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