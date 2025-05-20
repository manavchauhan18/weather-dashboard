import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://weather-dashboard-8e4r.onrender.com/api";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setForecast(null);

      const weatherRes = await axios.get(`${API_BASE_URL}/weather?city=${city}`);
      setWeather(weatherRes.data);

      const forecastRes = await axios.get(`${API_BASE_URL}/forecast?city=${city}`);
      setForecast(forecastRes.data);
    } catch (err) {
      setError("City not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Weather Dashboard</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "10px" }}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>Current Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {forecast && (
        <div>
          <h3>5-Day Forecast</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            {forecast.list
              .filter((_, index) => index % 8 === 0)
              .map((day, index) => (
                <div key={index} style={{ border: "1px solid gray", padding: "10px" }}>
                  <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                  <p>{day.main.temp}°C</p>
                  <p>{day.weather[0].description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
