import Redis from 'ioredis';
const redis = new Redis();
// data objects
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

    constructor() {
        this.initialized = this.initialize();
    }

    async initialize() {
        this.userId = 0;

        await (async () => {
            console.log("Generating New UserId");
            this.userId = await this.GetUniqueId();
            console.log('Wardrobe Made! New ID:', this.userId);
        })().then(()=>{
            this.hats = [];
            this.tops = [];
            this.bottoms = [];
            this.layers = [];
            this.footwear = [];
            this.accessories = [];
        })

    }

    async GetUniqueId() { // can add switch here to get uniqueId for different parameters
        let cursor = 0;
        const existingUserIds = new Set();

        do{
            const [newCursor, keys] = await redis.scan(cursor, 'MATCH', '*');
            keys.forEach((key)=> existingUserIds.add(key));
            cursor = newCursor;
        }while(cursor !== '0');

        // Generate a random integer until we find a unique one.
        let uniqueId;
        do {
            uniqueId = Math.floor(Math.random() * 100000);
        } while (existingUserIds.has(uniqueId));

        return uniqueId;
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
// returns JSON Object of user's wardrbe
export async function Read(userId){
    try{
        const data = await redis.get(userId);

        return JSON.parse(data);
    }catch(err){
        console.error("Couldn't read user data\n", err);
        return false;
    }
}
export async function CreateNewWardrbe(wardrobe, userId){
    const wardrobeObject = JSON.stringify(wardrobe, null, 2);

    try{
        await redis.set(userId, wardrobeObject);
        return true;
    }catch(err){
        console.error("Couldn't create new user\n", err);
        return false;
    }
}
export async function UpdateWardrbe(item, userId){
    try{
        const wardrbeObject = await read(userId);

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
                return false;
        }

        await redis.set(userId, JSON.stringify(wardrbeObject, null, 2));
            console.log("Item Added!", item);
            return true;
        }catch(err){
            console.error("Couldn't save new item\n", err);
            return false;
        }
}
export async function GenerateOutfit(weather, userId){
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length); //random index
        return arr[randomIndex];
    }
    try{
        let wardrobe = await read(userId);

        const modifiedWardrobe = new UserWardrbe();
        await modifiedWardrobe.initialized;
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

        return modifiedWardrobe;
    }catch(err){
        console.error("Couldn't generate outfit!\n", err);
        return false;
    }
}

'example code on how to update and create wardrobes'
// (async () => {
    // const instance = new UserWardrbe();
    // await instance.initialized;
    // console.log(instance);

    // await CreateNewWardrbe(instance, instance.userId);
    // await UpdateWardrbe(new Item('Winter Boots', 'Black', 'L', 'accessories', 'spring-fall'),27496);
    
    // const weather = { season: 'spring-fall' };
    // const userId = 27496;
    // GenerateOutfit(weather, userId).then((outfit) => {
    //     if (outfit) {
    //     console.log("Generated Outfit:", outfit);
    //     } else {
    //     console.log("Failed to generate outfit.");
    //     }
    // });
// })();
