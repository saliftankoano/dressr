import axios from 'axios';

export async function FetchWeather(zipcode) {
    try {
        const key = '3a9ff8978a1b48868a224538232909';

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${zipcode}&aqi=no`);
        return response.data.current;
    } catch (err) {
        console.log("Weather API Error: ", err)
    }
}