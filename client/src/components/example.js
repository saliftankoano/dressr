import axios from "axios";
import 'server/redisUri.json';
import {Weather, createId} from "./WardrbeBackend.js";

export async function GenerateOutfit(weather, userId) {    
	try {
		const response = await axios.get('http://localhost:4000/api/wardrobe/generate-outfit', {
            params: {
				weather: JSON.stringify(weather),
				userId: JSON.stringify(userId)
			}
		});
        if (response.status === 200) {
            if (response.data.outfit) {
                console.log('Outfit generated successfully');
                return response.data.outfit;
            } else {
                console.error('Failed to generate outfit', response.data);
            }
        } else {
            console.error('Request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error generating outfit:', error);
        // Log the detailed request if error response is available
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
    }
    return null;
}

const thisWeather = await new Weather(11735);
const userId = await new createId(27496);
// console.log(thisWeather, userId);
// process.exit();
console.log(await GenerateOutfit(thisWeather,userId));