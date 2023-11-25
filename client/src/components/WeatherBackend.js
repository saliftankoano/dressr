import axios from 'axios';

export async function FetchWeather(zipcode) {
    try {
        const key = '#';

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${zipcode}&aqi=no`);
        return response.data.current;
    } catch (err) {
        console.log("Weather API Error: ", err)
    }
}