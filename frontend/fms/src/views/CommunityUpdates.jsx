import React, { useState, useEffect } from "react";
import axios from "axios";

const CommunityUpdates = ({ authorName }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [updates, setUpdates] = useState([]);

  const fetchUpdates = async () => {
    const res = await axios.get("http://localhost:5000/api/updates");
    setUpdates(res.data.updates);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", authorName);
    formData.append("text", text);
    if (file) formData.append("media", file);

    await axios.post("http://localhost:5000/api/updates", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setText("");
    setFile(null);
    fetchUpdates();
  };

  return (
    <div>
      <h2>Community Updates</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share update..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Post Update</button>
      </form>

      <div>
        {updates.map((u) => (
          <div key={u._id}>
            <p><strong>{u.author}</strong>: {u.text}</p>
            {u.media && (
              u.media.endsWith(".mp4") ? (
                <video width="250" controls>
                  <source src={`http://localhost:5000${u.media}`} type="video/mp4" />
                </video>
              ) : (
                <img src={`http://localhost:5000${u.media}`} width="250" alt="media" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityUpdates;
