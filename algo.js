// once these items are created, i want to store them in a SQL db
// the db will have the unique (primary key) of userID to link them
class item{
    constructor(name, color, size, type, season="all", gender="neutral"){
        this.name = name;
        this.color = color;
        this.size = size;
        this.type = type; // type of clothing item
        this.season = season;
        this.gender = gender;
    }
    copyFrom(otherItem) {
        return new item(
        otherItem.name,
        otherItem.color,
        otherItem.size,
        otherItem.type,
        otherItem.season,
        otherItem.gender
        );
    }
}
class wardrbe{
    // could implement a tree that stores clothes in relation to one another
    // this would make sorting through them and finding the optimal clothing item
    // more efficent and reduce time complexity
    hats = [];
    tops = [];
    bottoms = [];
    layers = []; // jackets, sweaters, etc.
    footwear = [];
    accessories = [];

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
            case item.type =='hats':
                this.hats.push(item);
                break;
            case item.type =='accessories':
                this.accessories.push(item);
                break;
            default:
                console.log('Invalid Item Type:', item, '\nItem Type:', item.type);
                break;
        }
        return null;
    }
    // add functions for removing items, editing would be the same as removing and adding
    // a new item
}
class weather{
    constructor(temp, windspeed, humidity, season){
        this.temp = temp;
        this.windspeed = windspeed;
        this.humidity = humidity;
        this.season = season;
    }
}
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length); //random index
    let randElement = arr[randomIndex];
    console.log(randElement.name);
    return randElement.name, randElement.color, randElement.size, randElement.type, randElement.season, randElement.gender;
}
function algo(wardrobe, weather) { //maybe this should exist within the wardrbe class?
    const modifiedWardrobe = new wardrbe();
    const hats = [];
    const tops = [];
    const bottoms = [];
    const layers = []; // jackets, sweaters, etc.
    const footwear = [];
    const accessories = [];

    for (item in wardrobe.footwear) {
        if (item.season == weather.season) {
            footwear.push(item);
        }
    }
    let footwearItem = new item(getRandomElement(footwear));

    for (item in wardrobe.layers) {
        if (item.season == weather.season) {
            layers.push(item);
        }
    }
    let layersItem = new item(getRandomElement(layers));

    for (item in wardrobe.tops) {
        if (item.season == weather.season) {
            tops.push(item);
        }
    }
    let topsItem = new item(getRandomElement(tops));

    for (item in wardrobe.bottoms) {
        if (item.season == weather.season) {
            bottoms.push(item);
        }
    }
    let bottomsItem = new item(getRandomElement(bottoms));

    for (item in wardrobe.hats) {
        if (item.season == weather.season) {
            hats.push(item);
        }
    }
    let hatsItem = new item(getRandomElement(hats));

    for (item in wardrobe.accessories) {
        if (item.season == weather.season) {
            accessories.push(item);
        }
    }
    let accessoriesItem = new item(getRandomElement(accessories));
    
    modifiedWardrobe.add(footwearItem);
    modifiedWardrobe.add(layersItem);
    modifiedWardrobe.add(topsItem);
    modifiedWardrobe.add(bottomsItem);
    modifiedWardrobe.add(hatsItem);
    modifiedWardrobe.add(accessoriesItem);


  // Return the modified wardrobe
  return modifiedWardrobe;
}

const wardrobe = new wardrbe();
wardrobe.add(new item('Winter Boots', 'Black', 'L', 'footwear', 'summer'));
wardrobe.add(new item('Sneakers', 'White', 'M', 'footwear', 'summer'));
wardrobe.add(new item('Winter Jacket', 'Blue', 'XL', 'layers', 'summer'));
wardrobe.add(new item('Leather Jacket', 'Brown', 'M', 'layers', 'summer'));
wardrobe.add(new item('Slim Fit Jeans', 'Blue', '32', 'bottoms', 'summer'));
wardrobe.add(new item('Cashmere Sweater', 'Gray', 'S', 'tops', 'summer'));
wardrobe.add(new item('Ankle Boots', 'Taupe', '7', 'footwear', 'summer'));
wardrobe.add(new item('Silk Blouse', 'Ivory', 'XS', 'tops', 'summer'));
wardrobe.add(new item('Pleated Skirt', 'Burgundy', 'M', 'bottoms', 'summer'));
wardrobe.add(new item('Trench Coat', 'Beige', 'L', 'layers', 'summer'));
wardrobe.add(new item('High-Top Sneakers', 'White', '9', 'footwear', 'summer'));
wardrobe.add(new item('Knit Beanie', 'Navy', 'One Size', 'accessories', 'summer'));
wardrobe.add(new item('Floral Sundress', 'Pink', 'S', 'tops', 'summer'));

const currentWeather = new weather(30, 10, 50, 'summer'); // Example weather conditions

console.log(algo(wardrobe, currentWeather));
