// src/views/NewsDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div>
      <h2>{news.title}</h2>
      <p>Category: {news.category}</p>
      <p>{news.description}</p>
      <p>Author: {news.author}</p>
    </div>
  );
};

export default NewsDetail;
