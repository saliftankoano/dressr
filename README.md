# How It's Done
## How Pages are Routed
`App.js` allows for us to route the user from page to page

- Using import `BrowserRouter, Route, Routes from 'react-router-dom'`
- Pages are imported using their address
    - ex: `import Wardrbe from "./components/Wardrbe.js";`
- Within the function `App()`, routes to different pages are set up using the `<Route>` attribute 
    - ex: `<Route path= '/wardrbe' element={<Wardrbe/>}/>`

## How functions are Imported
In order for functions to be imported from other pages, we have to enable `"type": "module"` in `package.json`. This creates a bit of an annoyance because now *every single* import needs to include extensions. *Sorry about that*. 

But this allows us to import functions and classes from other files using the following syntax:
```
import { className, functionName } from './file.js';
```

## How the `Wardrbe` is Processed
The application processes information using file `WardrbeBackend.js`. 
## class `item`
The `item` class contains instances of each item that is created by the user and assigned to the wardrbe.
The constructor allows for adding only name, color, size, type, season, and gender of the item added. Unfornately, JS only allows for one constructor per class, which is kinda wack. So this will do for now, functions can be created to edit certain features later. 

The class also contains a copy function to copy over items from another item to the existing item. This has no use as of now.

## class `wardrbe`
The `wardrbe` class contains lists that hold the items for hats, tops, bottoms, layers, footwear, and accessories. The `add()` function adds `item` objects to their respective list. 

ex: "Red Soxs Hat" gets added to `hats` list.

The constructor gives the instance a `userId`, since a user can only have one `wardrbe`.
For this, a `GetUniqueId()` function exists within `wardrbe` to generate a UNIQUE id per wardrbe

## class `weather`
Contains a constructor for taking in the user's zipcode, which is used by the `WeatherBackend.js` function `FetchWeather(zipcode)` to get information about the weather.

The weather information is just used to calculate a phony "season" attribute to help the `GenerateOutfit()` function generate an appropiate outfit.

## function `GenerateOutfit(wardrobe, weather)`
Takes in a generic `wardrbe` object "wardrobe" (confusing, ik) and `weather` object "weather".

Creates a modified `wardrbe` object populated with randomly selected objects with respect to their type and season type. 

# How Information is Stored
Wardrbe objects are saved using function `SaveWardrbe()`, this function should ONLY be used when saving a new, unique wardrbe (which is for a new user). 
## function `SaveWardrbe(wardrobe)`
saves entire wardrbe object into `./data/outfits.json`, and a minified version into `./data/outfitsMin.json`

Saving _minnified_ json files is commented out for now. No longer need it. 

# Read Before Installing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm install use-local-storage-state`

Using local storage for now, must install!

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
