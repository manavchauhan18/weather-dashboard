const axios = require("axios");
const { OPENWEATHER_API_KEY, BASE_URL } = require("../config/config");

async function getCurrentWeather(city) {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, appid: OPENWEATHER_API_KEY, units: "metric" },
  });
  return response.data;
}

async function getWeatherForecast(city) {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { q: city, appid: OPENWEATHER_API_KEY, units: "metric" },
  });
  return response.data;
}

module.exports = { getCurrentWeather, getWeatherForecast };
