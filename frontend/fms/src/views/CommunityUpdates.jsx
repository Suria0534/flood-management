// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/community.css";

// const CommunityUpdates = ({ user }) => {
//   const [updates, setUpdates] = useState([]);
//   const [text, setText] = useState("");
//   const [files, setFiles] = useState([]);

//   // -----------------------------
//   // Fetch all updates
//   // -----------------------------
//   const fetchUpdates = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/updates");
//       // Backend response structure handle
//       const updatesData = Array.isArray(res.data)
//         ? res.data
//         : res.data.updates || [];
//       setUpdates(updatesData);
//     } catch (err) {
//       console.error("Failed to fetch updates:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUpdates();
//   }, []);

//   // -----------------------------
//   // Submit new update
//   // -----------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       return alert("Please login to post updates");
//     }

//     const formData = new FormData();
//     formData.append("author", user.email);
//     formData.append("role", user.role || "User"); // <-- role added
//     formData.append("text", text);
//     files.forEach((file) => formData.append("media", file));

//     try {
//       await axios.post("http://localhost:5000/api/updates", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
//         },
//       });

//       // Reset form
//       setText("");
//       setFiles([]);
//       // Refresh feed
//       fetchUpdates();
//     } catch (err) {
//       console.error("Failed to post update:", err);
//       alert(err.response?.data?.message || "Failed to post update");
//     }
//   };

//   return (
//     <div className="community-page">
//       <h1>Community Updates</h1>

//       {user && (
//         <form onSubmit={handleSubmit} className="update-form">
//           <textarea
//             placeholder="Share an update..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setFiles(Array.from(e.target.files))}
//           />
//           <button type="submit">Post</button>
//         </form>
//       )}

//       <div className="newsfeed">
//         {updates.length === 0 ? (
//           <p>No updates yet.</p>
//         ) : (
//           updates.map((u) => (
//             <div key={u._id} className="update-card">
//               <div className="update-author">
//                 {u.author}{" "}
//                 {u.role && <span className="author-role">({u.role})</span>}
//               </div>
//               <div className="update-text">{u.text}</div>
//               {u.media && u.media.length > 0 && (
//                 <div className="media-container">
//                   {u.media.map((m, idx) =>
//                     m.endsWith(".mp4") ? (
//                       <video key={idx} controls className="update-media">
//                         <source
//                           src={`http://localhost:5000${m}`}
//                           type="video/mp4"
//                         />
//                       </video>
//                     ) : (
//                       <img
//                         key={idx}
//                         src={`http://localhost:5000${m}`}
//                         alt="media"
//                         className="update-media"
//                       />
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityUpdates;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/community.css";

const CommunityUpdates = ({ user, isAdmin = false }) => {
  const [updates, setUpdates] = useState([]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  // -----------------------------
  // Fetch all updates
  // -----------------------------
  const fetchUpdates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/updates");
      const updatesData = Array.isArray(res.data) ? res.data : res.data.updates || [];
      setUpdates(updatesData);
    } catch (err) {
      console.error("Failed to fetch updates:", err);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // -----------------------------
  // Submit new update
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to post updates");

    const formData = new FormData();
    formData.append("author", user.email);
    formData.append("role", user.role || "User");
    formData.append("text", text);
    files.forEach((file) => formData.append("media", file));

    try {
      await axios.post("http://localhost:5000/api/updates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
      });
      setText("");
      setFiles([]);
      fetchUpdates();
    } catch (err) {
      console.error("Failed to post update:", err);
      alert(err.response?.data?.message || "Failed to post update");
    }
  };

  // -----------------------------
  // Delete update (admin only)
  // -----------------------------
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      await axios.delete(`http://localhost:5000/api/updates/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUpdates();
    } catch (err) {
      console.error("Failed to delete update:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="community-page">
      <h1>Community Updates</h1>

      {user && (
        <form onSubmit={handleSubmit} className="update-form">
          <textarea
            placeholder="Share an update..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
          />
          <button type="submit">Post</button>
        </form>
      )}

      <div className="newsfeed">
        {updates.length === 0 ? (
          <p>No updates yet.</p>
        ) : (
          updates.map((u) => (
            <div key={u._id} className="update-card">
              <div className="update-author">
                {u.author}{" "}
                {u.role && <span className="author-role">({u.role})</span>}
                {isAdmin && (
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="update-text">{u.text}</div>
              {u.media && u.media.length > 0 && (
                <div className="media-container">
                  {u.media.map((m, idx) =>
                    m.endsWith(".mp4") ? (
                      <video key={idx} controls className="update-media">
                        <source src={`http://localhost:5000${m}`} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        key={idx}
                        src={`http://localhost:5000${m}`}
                        alt="media"
                        className="update-media"
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityUpdates;
