import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/weather?city=Feni");
        setWeather(res.data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather...</p>;
  if (!weather) return <p>Weather data not available.</p>;

  return (
    <div className="weather-page">
      <h2>🌤 Weather Update</h2>
      <p><strong>City:</strong> {weather.location}</p>
      <p><strong>Temperature:</strong> {weather.temperature}°C</p>
      <p><strong>Condition:</strong> {weather.condition}</p>
      <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
      <p><strong>Rain Forecast:</strong> {weather.rainForecast} mm</p>
      <p><strong>Alert:</strong> {weather.alert}</p>
    </div>
  );
};

export default WeatherPage;
