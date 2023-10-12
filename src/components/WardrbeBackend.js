// once these items are created, i want to store them in a SQL db
// the db will have the unique (primary key) of userID to link them
import { FetchWeather } from './WeatherBackend.js'; // error broski tripping frfr

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
    hats = [];
    tops = [];
    bottoms = [];
    layers = []; // jackets, sweaters, etc.
    footwear = [];
    accessories = [];

    constructor(){
        console.log('wardrbe made');
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
    // add functions for removing items, editing would be the same as removing and adding a new item
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

export function algo(wardrobe, weather) { // this could be a function within wardrbe ex: myWardrobe.getOutfit();
    
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

// const wardrobe = new UserWardrbe();
// wardrobe.add(new Item('Winter Boots', 'Black', 'L', 'footwear', 'summer'));
// wardrobe.add(new Item('Sneakers', 'White', 'M', 'footwear', 'summer'));
// wardrobe.add(new Item('Winter Jacket', 'Blue', 'XL', 'layers', 'summer'));
// wardrobe.add(new Item('Leather Jacket', 'Brown', 'M', 'hats', 'summer'));
// wardrobe.add(new Item('Slim Fit Jeans', 'Blue', '32', 'bottoms', 'summer'));
// wardrobe.add(new Item('Cashmere Sweater', 'Gray', 'S', 'tops', 'summer'));
// wardrobe.add(new Item('Ankle Boots', 'Taupe', '7', 'footwear', 'summer'));
// wardrobe.add(new Item('Silk Blouse', 'Ivory', 'XS', 'tops', 'summer'));
// wardrobe.add(new Item('Pleated Skirt', 'Burgundy', 'M', 'bottoms', 'summer'));
// wardrobe.add(new Item('Trench Coat', 'Beige', 'L', 'layers', 'summer'));
// wardrobe.add(new Item('High-Top Sneakers', 'White', '9', 'footwear', 'summer'));
// wardrobe.add(new Item('Knit Beanie', 'Navy', 'One Size', 'accessories', 'summer'));
// wardrobe.add(new Item('Floral Sundress', 'Pink', 'S', 'tops', 'summer'));
// const currentWeather = new Weather('11735'); // Example weather conditions

// console.log(algo(wardrobe, currentWeather));