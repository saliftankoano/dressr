// once these items are created, i want to store them in a SQL db
// the db will have the unique (primary key) of userID to link them
class item{
    constructor(name, color, size, type, season, gender="all"){
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
    // implement a tree that stores clothes in relation to one another
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
            case item.type ='hats':
                this.hats.push(item);
                break;
            case item.type ='accessories':
                this.accessories.push(item);
                break;
            default:
                console.log('Invalid Item Type:', item, '\nItem Type:', item.type);
                break;
        }
        return null;
    }
    // add functions for removing items, editing would be the same as removing and adding a new item
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
    return arr[randomIndex];
}
function algo(wardrobe, weather) { // this could be a function within wardrbe ex: myWardrobe.getOutfit();
    const modifiedWardrobe = new wardrbe();
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

// const wardrobe = new wardrbe();
// wardrobe.add(new item('Winter Boots', 'Black', 'L', 'footwear', 'summer'));
// wardrobe.add(new item('Sneakers', 'White', 'M', 'footwear', 'summer'));
// wardrobe.add(new item('Winter Jacket', 'Blue', 'XL', 'layers', 'summer'));
// wardrobe.add(new item('Leather Jacket', 'Brown', 'M', 'hats', 'summer'));
// wardrobe.add(new item('Slim Fit Jeans', 'Blue', '32', 'bottoms', 'summer'));
// wardrobe.add(new item('Cashmere Sweater', 'Gray', 'S', 'tops', 'summer'));
// wardrobe.add(new item('Ankle Boots', 'Taupe', '7', 'footwear', 'summer'));
// wardrobe.add(new item('Silk Blouse', 'Ivory', 'XS', 'tops', 'summer'));
// wardrobe.add(new item('Pleated Skirt', 'Burgundy', 'M', 'bottoms', 'summer'));
// wardrobe.add(new item('Trench Coat', 'Beige', 'L', 'layers', 'summer'));
// wardrobe.add(new item('High-Top Sneakers', 'White', '9', 'footwear', 'summer'));
// wardrobe.add(new item('Knit Beanie', 'Navy', 'One Size', 'accessories', 'summer'));
// wardrobe.add(new item('Floral Sundress', 'Pink', 'S', 'tops', 'summer'));
// const currentWeather = new weather(30, 10, 50, 'summer'); // Example weather conditions

// console.log(algo(wardrobe, currentWeather));