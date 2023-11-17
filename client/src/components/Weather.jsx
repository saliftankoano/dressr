import React, { useState, useEffect } from "react";
import axios from 'axios';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [zipcode, setZipcode] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    function measureHumidity(n){
        if(n <= 55){
            return "Dry weather today";
        }
        if(n>55 && n<65){
            return "Moderate humidity"
        }

        if(n>=65){
            return "Humid weather today"
        }
    }

    const fetchData = async () => {
        try {
            const key = '3a9ff8978a1b48868a224538232909'
            setLoading(true);
            setError(null);

            const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${zipcode}&days=1&aqi=no&alerts=no`);
            setWeatherData(response.data.current);
            setForecastData(response.data.forecast.forecastday[0].day);
            setLocation(response.data.location);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setZipcode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <div>
                <h1 class="logo">DRESSER</h1>
            </div>
            <br></br>
            <div align="center" class="container">
            <h2>Weather Information for Zipcode: {zipcode}</h2>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Zipcode:
                    <input name="zipcode" value={zipcode} type="text" placeholder="Enter Zip Code" onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {weatherData && (
                <div>
                    <p>{location.name}, {location.region}</p>
                    <p>Temperature: {weatherData.temp_f}&deg;F</p>
                    <p>Wind Speed: {weatherData.wind_mph} mph</p>
                    <p>Feels Like: {weatherData.feelslike_f}&deg;F</p>
                    <p>Chance of Rain: {forecastData.daily_chance_of_rain}%</p>
                    <p>Humidity: {weatherData.humidity}%. {measureHumidity(weatherData.humidity)}</p>
                </div>
            )}
            </div>
        </div>
    );
}

export default Weather;
