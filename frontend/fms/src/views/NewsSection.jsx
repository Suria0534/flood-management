// NewsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherUpdate = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/weather");
        setWeather(res.data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };
    fetchWeather();
  }, []);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="news-card weather-card">
      <h4>Weather Update - {weather.city}</h4>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.description}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} m/s</p>
    </div>
  );
};

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/news");
        setNews(res.data);
      } catch (err) {
        console.error("News fetch error:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-section">
      <h2>Flood Relief News and Updates</h2>

      {/* Weather update */}
      <WeatherUpdate />

      {/* News list */}
      <div className="news-list">
        {news.length === 0 ? (
          <p>No news available</p>
        ) : (
          news.map((n) => (
            <div key={n._id} className="news-card">
              <h4>{n.title}</h4>
              <p>{n.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsSection;
