import { FetchWeather } from './WeatherBackend.js';
import fs from 'fs';
let OUTFITPATH = './data/outfits.json';
// let OUTFITMINPATH = './data/outfitsMin.json';

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
export class UserWardrbe{
    // implement a tree that stores clothes in relation to one another
    // this would make sorting through them and finding the optimal clothing item
    // more efficent and reduce time complexity
    userId = 0;
    hats = [];
    tops = [];
    bottoms = [];
    layers = []; // jackets, sweaters, etc.
    footwear = [];
    accessories = [];

    constructor(){
        this.userId = this.GetUniqueId();
        console.log('wardrbe made, id:', this.userId);
    }

    add(item){
        switch(item.type){
            case item.type ="footwear":
                this.footwear.push(item);
                break;
            case item.type ='layers':
                this.layers.push(item);
                break;
            case item.type ='bottoms':
                this.bottoms.push(item);
                break;
            case item.type ='tops':
                this.tops.push(item);
                break;
            case item.type ='hats':
                this.hats.push(item);
                break;
            case item.type ='accessories':
                this.accessories.push(item);
                break;
            default:
                console.log('Invalid Item Type:', item.type);
                break;
        }
        return null;
    }
    GetUniqueId() { // can add switch here to get uniqueId for different parameters
        const postsJsonObject = JSON.parse(fs.readFileSync(OUTFITPATH, 'utf8'));

        // Create a set of all the existing post IDs.
        const existingUserIds = new Set();
        for (const post of postsJsonObject) {
            existingUserIds.add(post.userId);
        }

        // Generate a random integer until we find a unique one.
        let uniqueId;
        do {
            uniqueId = Math.floor(Math.random() * 100000);
        } while (existingUserIds.has(uniqueId));

        return uniqueId;
    }
}
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
export function GenerateOutfit(wardrobe, weather) { // this could be a function within wardrbe ex: myWardrobe.getOutfit();
    
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length); //random index
        return arr[randomIndex];
    }
    
    const modifiedWardrobe = new UserWardrbe();
    const hats = [];
    const tops = [];
    const bottoms = [];
    const layers = []; // jackets, sweaters, etc.
    const footwear = [];
    const accessories = [];

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


  // return the modified wardrobe
  return modifiedWardrobe;
}
export function SaveNewWardrbe(wardrobe){
    const jsonFileContents = fs.readFileSync(OUTFITPATH, 'utf8');

    const jsonObject = JSON.parse(jsonFileContents);
    jsonObject.push(wardrobe);
    const jsonString = JSON.stringify(jsonObject, null, 2); // pretty format
    const jsonMinString = JSON.stringify(jsonObject, null, 0); // min format

    fs.writeFileSync(OUTFITPATH, jsonString, 'utf8');
    // fs.writeFileSync(OUTFITMINPATH, jsonMinString, 'utf8');
}
export function UpdateWardrbe(item, userId) { // add switch function to add 'remove' and 'edit'
    const outfitsJson = JSON.parse(fs.readFileSync(OUTFITPATH, 'utf8'));
    const wardrbeObject = outfitsJson.find(outfit => outfit.userId === userId);

    if (!wardrbeObject) {
        console.error('User Id:', userId, ' Wardrbe not found!');
        return;
    }

    switch(item.type){
        case 'hats':
            wardrbeObject.hats.push(item);
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
    }
    console.log('Item added:', item.name);
    fs.writeFileSync(OUTFITPATH, JSON.stringify(outfitsJson, null, 2), 'utf8');
}


// const wardrobe = new UserWardrbe();
// wardrobe.add(new Item('Winter Boots', 'Black', 'L', 'footwear', 'spring-fall'));
// wardrobe.add(new Item('Sneakers', 'White', 'M', 'footwear', 'spring-fall'));
// wardrobe.add(new Item('Winter Jacket', 'Blue', 'XL', 'layers', 'spring-fall'));
// wardrobe.add(new Item('Leather Jacket', 'Brown', 'M', 'hats', 'spring-fall'));
// wardrobe.add(new Item('Slim Fit Jeans', 'Blue', '32', 'bottoms', 'spring-fall'));
// wardrobe.add(new Item('Cashmere Sweater', 'Gray', 'S', 'tops', 'spring-fall'));
// wardrobe.add(new Item('Ankle Boots', 'Taupe', '7', 'footwear', 'spring-fall'));
// wardrobe.add(new Item('Silk Blouse', 'Ivory', 'XS', 'tops', 'spring-fall'));
// wardrobe.add(new Item('Pleated Skirt', 'Burgundy', 'M', 'bottoms', 'spring-fall'));
// wardrobe.add(new Item('Trench Coat', 'Beige', 'L', 'layers', 'spring-fall'));
// wardrobe.add(new Item('High-Top Sneakers', 'White', '9', 'footwear', 'spring-fall'));
// wardrobe.add(new Item('Knit Beanie', 'Navy', 'One Size', 'accessories', 'spring-fall'));
// wardrobe.add(new Item('Floral Sundress', 'Pink', 'S', 'tops', 'spring-fall'));
// const currentWeather = new Weather('11735'); // Example weather conditions
// SaveNewWardrbe(wardrobe);
let wardrobe = (new Item('Timbs', 'Brown', '7', 'hats', 'spring-fall'));
UpdateWardrbe(wardrobe, 40994);
// console.log(GenerateOutfit(wardrobe, currentWeather));