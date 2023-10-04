import React, {useState, useEffect} from "react";
import axios from 'axios';

function Weather(){
    const [temperature, setTemperature] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const key = '3a9ff8978a1b48868a224538232909';
        const zipcode = '11369';

        axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${zipcode}&aqi=no`)
            .then((response) => {
            const temperature = response.data.current.temp_f;
            const windSpeed = response.data.current.wind_mph;

            setTemperature(temperature);
            setWindSpeed(windSpeed);
            setLoading(false);
        })
            .catch((err) => {
            setError(err);
            setLoading(false);
        });
    },[]);

    return (
        <div>
          <h1>Zipcode: 11369</h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {temperature && <p>Temperature: {temperature}&deg;F</p>}
          {windSpeed && <p>Wind Speed: {windSpeed} mph</p>}
        </div>
      );
}

export default Weather;