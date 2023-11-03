import React, { useState, useEffect } from "react";
import axios from 'axios';
import './RafidTempStyle.css'

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [zipcode, setZipcode] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const key = '3a9ff8978a1b48868a224538232909'
            setLoading(true);
            setError(null);

            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${zipcode}&aqi=no`);
            setWeatherData(response.data.current);
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
        <div align="center">
            <h1>Weather Information for Zipcode: {zipcode}</h1>
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
                    <p>Temperature: {weatherData.temp_f}&deg;F</p>
                    <p>Wind Speed: {weatherData.wind_mph} mph</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
