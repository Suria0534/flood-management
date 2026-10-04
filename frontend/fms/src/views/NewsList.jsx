// src/views/NewsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/news"); // no auth needed if public
        setNews(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h2>Flood Relief News & Updates</h2>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul>
          {news.map(n => (
            <li key={n._id}>
              <strong>{n.title}</strong> ({n.category}) <br />
              {n.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsList;
