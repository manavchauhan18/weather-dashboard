const weatherService = require("../service/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City name is required" });

    const weatherData = await weatherService.getCurrentWeather(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || "Error fetching data" });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City name is required" });

    const forecastData = await weatherService.getWeatherForecast(city);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || "Error fetching data" });
  }
};
