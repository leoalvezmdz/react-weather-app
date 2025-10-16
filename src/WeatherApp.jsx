import React, { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "YOUR_API_KEY";


  const fetchWeaterData = async () => {
    try {
      const response = await fetch(
        `${URL}?q=${city}&appid=${API_KEY}&lang=es&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error('Hubo un error:', error);
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeaterData();
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresá una ciudad"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {
        weatherData &&(
          <div>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Temperatura: {Math.floor(weatherData.main.temp)} °C</p>
            <p>Descripción: {weatherData.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
          </div>
        )
      }
    </div>
  );
};
