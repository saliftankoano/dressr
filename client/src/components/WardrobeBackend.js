import axios from 'axios';
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
 * @constructor initalizes empty arrays of wardrobe items
 * @add(item) adds item to wardrobe
 */
export class UserWardrobe{
    constructor() {
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
    }
}
/**
 * 
 * @param {int} zipcode 
 * @returns {object} weather data
 */
export async function FetchWeather(zipcode) {
    try {
        const response = await axios.get(`http://localhost:4000/api/weather?zipcode=${zipcode}`);
        return response.data;
    } catch (err) {
        console.log("Weather API Error: ", err)
    }
}