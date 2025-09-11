import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AnnouncementsAndWeather.css";


const AnnouncementsAndWeather = () => {
  const [data, setData] = useState({ news: [], weather: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch announcements:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <p>Loading announcements and weather...</p>;

  return (
    <div className="announcements-weather">
      {/* Latest News */}
      <div className="news-list">
        <h3>Latest News</h3>
        {data.news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          data.news.map(n => (
            <div key={n._id} className="news-item">
              <strong>{n.title}</strong>
              <p>{n.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Latest Weather */}
      {data.weather && (
        <div className="weather-box">
          <h3>Weather Update</h3>
          <p><strong>City:</strong> {data.weather.location || "Unknown"}</p>
          <p><strong>Temperature:</strong> {data.weather.temperature ?? "N/A"}°C</p>
          <p><strong>Condition:</strong> {data.weather.condition || "Not available"}</p>
          <p><strong>Wind Speed:</strong> {data.weather.windSpeed ?? "N/A"} m/s</p>
          <p><strong>Rain Forecast:</strong> {data.weather.rainForecast ?? 0} mm</p>
          <p><strong>Alert:</strong> {data.weather.alert || "No alerts"}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsAndWeather;
