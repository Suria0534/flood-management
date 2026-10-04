

// // VictimDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import SOSButton from "../views/SOSButton";
// import Modal from "react-modal";
// import HelpRequest from "../views/HelpRequest";
// import CommunityUpdates from "../views/CommunityUpdates";
// import CommunityChat from "../views/CommunityChat";
// import "../styles/victimdashboard.css";

// Modal.setAppElement("#root");

// function VictimDashboard() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Email from login state
//   const emailFromState = location.state?.email || "";

//   // Profile state
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   // Shelters
//   const [shelters, setShelters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Matched volunteers/resources
//   const [matches, setMatches] = useState([]);

//   // Community updates
//   const [modalOpen, setModalOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [updates, setUpdates] = useState([]);

//   // Announcements & weather
//   const [announcements, setAnnouncements] = useState([]);
//   const [weather, setWeather] = useState(null);

//   // -----------------------------
//   // Fetch profile by email
//   // -----------------------------
//   useEffect(() => {
//     if (!emailFromState) return;

//     const fetchProfile = async () => {
//       try {
//         console.log("Fetching profile for:", emailFromState);
//         const res = await axios.get(
//           `http://localhost:5000/api/victim/email/${emailFromState.trim()}`
//         );

//         if (res.data) {
//           setProfile(res.data);
//         } else {
//           console.warn("No profile returned from backend");
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err.response?.data || err.message);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     fetchProfile();
//   }, [emailFromState]);

//   // -----------------------------
//   // Fetch shelters
//   // -----------------------------
//   useEffect(() => {
//     const fetchShelters = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/shelters");
//         setShelters(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchShelters();
//   }, []);

//   // -----------------------------
//   // Fetch community updates
//   // -----------------------------
//   useEffect(() => {
//     const fetchUpdates = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/updates");
//         setUpdates(res.data.updates || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUpdates();
//   }, []);

//   // -----------------------------
//   // Fetch announcements & weather
//   // -----------------------------
//   useEffect(() => {
//     const fetchAnnouncementsWeather = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/announcements");
//         setAnnouncements(res.data.news || []);
//         setWeather(res.data.weather || null);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchAnnouncementsWeather();
//   }, []);

//   // -----------------------------
//   // Fetch matched volunteers/resources
//   // -----------------------------
//   useEffect(() => {
//     if (!profile) return;

//     const fetchMatches = async () => {
//       try {
//         // Use email to fetch matched volunteers
//         const res = await axios.get(
//           `http://localhost:5000/api/matching/email/${profile.email}`
//         );
//         setMatches(res.data.matchedVolunteers || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMatches();
//   }, [profile]);

//   // Filter shelters by search term
//   const filteredShelters = shelters.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // -----------------------------
//   // Handle posting community update
//   // -----------------------------
//   const handleSubmitUpdate = async (e) => {
//     e.preventDefault();
//     if (!profile) return;

//     try {
//       const formData = new FormData();
//       formData.append("author", profile.name);
//       formData.append("text", text);
//       if (file) formData.append("media", file);

//       await axios.post("http://localhost:5000/api/updates", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setText("");
//       setFile(null);
//       setModalOpen(false);

//       const res = await axios.get("http://localhost:5000/api/updates");
//       setUpdates(res.data.updates || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];

//   if (loadingProfile) return <p>Loading profile...</p>;
//   if (!profile) return <p>Profile not found!</p>;

//   return (
//     <div className="container-victdash">
//       {/* Profile & Logout */}
//       <div className="profile-corner">
//             <img src={profile.profilePic || "/default-profile.png"} alt="Profile" />
//             <div className="profile-info">
//               <p><strong>{profile.name}</strong></p>
//               <p>Email: {profile.email}</p>
//               <p>Phone: {profile.phone}</p>
//               <p>Location: {profile.location}</p>

//               {/* Profile picture update */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setProfilePicFile(e.target.files[0])}
//               />
//               {profilePicFile && (
//                 <button onClick={async () => {
//                   if (!profile || !profilePicFile) return;
//                   try {
//                     const formData = new FormData();
//                     formData.append("profilePic", profilePicFile);
//                     const res = await axios.put(
//                       `http://localhost:5000/api/victim/profile-pic/${profile._id}`,
//                       formData,
//                       { headers: { "Content-Type": "multipart/form-data" } }
//                     );
//                     setProfile(res.data); // update profile with new picture
//                     setProfilePicFile(null);
//                   } catch (err) {
//                     console.error("Profile picture update failed:", err.response?.data || err.message);
//                   }
//                 }}>Upload Profile Picture</button>
//               )}
//     </div>

//     <button onClick={() => navigate("/login")}>Logout</button>
//   </div>

//       <div className="dashboard-content">
//         <h2>Victim Dashboard</h2>

//         {/* Emergency Section */}
//         <div className="glass-section">
//           <h3>Emergency SOS</h3>
//           <SOSButton numbers={emergencyNumbers} />
//           <HelpRequest email={profile.email} />
//         </div>

//         {/* Community Chat */}
//         <div className="glass-section">
//           <h2>Community Chat</h2>
//           <CommunityChat
//             userName={profile.name}
//             userEmail={profile.email}
//             userPhone={profile.phone}
//             userLocation={profile.location}
//           />
//         </div>

//         {/* Matched Volunteers/Resources */}
//         {/* <div className="glass-section">
//           <h2>Matched Volunteers/Resources</h2>
//           {matches.length === 0 ? (
//             <p>No matches found in your area.</p>
//           ) : (
//             <ul>
//               {matches.map((v) => (
//                 <li key={v._id}>
//                   <p><strong>{v.name}</strong></p>
//                   <p>Location: {v.location}</p>
//                   <p>Skills: {v.skills || "N/A"}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div> */}

//         {/* Shelters */}
//         <div className="glass-section">
//           <h2>Nearby Shelters</h2>
//           <input
//             type="text"
//             placeholder="Search shelters by name or location..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {filteredShelters.length === 0 ? (
//             <p>No shelters found.</p>
//           ) : (
//             <ul>
//               {filteredShelters.map((s) => (
//                 <li key={s._id}>
//                   <p><strong>{s.name}</strong></p>
//                   <p>Location: {s.location}</p>
//                   <p>Capacity: {s.totalCapacity}, Current Occupancy: {s.currentOccupancy}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Announcements & Weather */}
//         <div className="glass-section">
//           <h2>Important Announcements & Weather</h2>
//           <div className="announcements">
//             {announcements.length === 0 ? (
//               <p>No announcements yet.</p>
//             ) : (
//               announcements.map((n) => (
//                 <div key={n._id} className="announcement-item">
//                   <strong>{n.title}</strong>
//                   <p>{n.description}</p>
//                 </div>
//               ))
//             )}
//           </div>
//           {weather && (
//             <div className="weather-box">
//               <h4>Weather Update</h4>
//               <p>City: {weather.location}</p>
//               <p>Temperature: {weather.temperature}°C</p>
//               <p>Condition: {weather.condition}</p>
//               <p>Wind Speed: {weather.windSpeed} m/s</p>
//               <p>Rain Forecast: {weather.rainForecast} mm</p>
//               <p>Alert: {weather.alert || "None"}</p>
//             </div>
//           )}
//         </div>

//         {/* Community Updates */}
//         <div className="glass-section">
//           <CommunityUpdates user={{ name: profile.name, token: "demoToken" }} />
//         </div>
//       </div>

//       {/* Modal for posting update */}
//       <Modal
//         isOpen={modalOpen}
//         onRequestClose={() => setModalOpen(false)}
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2>Share Update</h2>
//         <form onSubmit={handleSubmitUpdate}>
//           <textarea
//             placeholder="Write something..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//           <input
//             type="file"
//             accept="image/*,video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button type="submit">Post</button>
//           <button type="button" onClick={() => setModalOpen(false)}>Close</button>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default VictimDashboard;






// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import SOSButton from "../views/SOSButton";
// import Modal from "react-modal";
// import HelpRequest from "../views/HelpRequest";
// import CommunityUpdates from "../views/CommunityUpdates";
// import CommunityChat from "../views/CommunityChat";
// import "../styles/victimdashboard.css";

// Modal.setAppElement("#root");

// function VictimDashboard() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // -----------------------------
//   // Receive email and token from login
//   // -----------------------------
//   const emailFromState = location.state?.email || "";
//   const tokenFromState = location.state?.token || "";

//   // -----------------------------
//   // Profile state
//   // -----------------------------
//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const fileInputRef = useRef();

//   // -----------------------------
//   // Shelters
//   // -----------------------------
//   const [shelters, setShelters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // -----------------------------
//   // Community updates
//   // -----------------------------
//   const [modalOpen, setModalOpen] = useState(false);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [updates, setUpdates] = useState([]);

//   // -----------------------------
//   // Announcements & weather
//   // -----------------------------
//   const [announcements, setAnnouncements] = useState([]);
//   const [weather, setWeather] = useState(null);

//   // -----------------------------
//   // Fetch profile
//   // -----------------------------
//   useEffect(() => {
//     if (!emailFromState) return;
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/victim/email/${emailFromState.trim()}`
//         );
//         if (res.data) setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err.response?.data || err.message);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };
//     fetchProfile();
//   }, [emailFromState]);

//   // -----------------------------
//   // Fetch shelters
//   // -----------------------------
//   useEffect(() => {
//     const fetchShelters = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/shelters");
//         setShelters(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchShelters();
//   }, []);

//   // -----------------------------
//   // Fetch announcements & weather
//   // -----------------------------
//   useEffect(() => {
//     const fetchAnnouncementsWeather = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/announcements");
//         setAnnouncements(res.data.news || []);
//         setWeather(res.data.weather || null);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchAnnouncementsWeather();
//   }, []);

//   // -----------------------------
//   // Handle profile picture update
//   // -----------------------------
//   const handleProfilePicChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile || !profile) return;

//     const formData = new FormData();
//     formData.append("profilePic", selectedFile);

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/victim/profile-pic/${profile._id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setProfile(res.data); // update profile immediately
//     } catch (err) {
//       console.error("Profile picture update failed:", err.response?.data || err.message);
//     }
//   };

//   // -----------------------------
//   // Filter shelters by search term
//   // -----------------------------
//   const filteredShelters = shelters.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];

//   if (loadingProfile) return <p>Loading profile...</p>;
//   if (!profile) return <p>Profile not found!</p>;

//   return (
//     <div className="container-victdash">
//       {/* Profile & Logout */}
//       <div className="profile-corner">
//         <img
//           src={
//             profile.profilePic
//               ? `http://localhost:5000/uploads/${profile.profilePic}`
//               : "/default-profile.png"
//           }
//           alt="Profile"
//           style={{ cursor: "pointer" }}
//           onClick={() => fileInputRef.current.click()}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleProfilePicChange}
//         />

//         <div className="profile-info">
//           <p><strong>{profile.name}</strong></p>
//           <p>Email: {profile.email}</p>
//           <p>Phone: {profile.phone}</p>
//           <p>Location: {profile.location}</p>
//           <button onClick={() => navigate("/login")}>Logout</button>
//         </div>
//       </div>

//       <div className="dashboard-content">
//         <h2>Victim Dashboard</h2>

//         {/* Emergency Section */}
//         <div className="glass-section">
//           <h3>Emergency SOS</h3>
//           <SOSButton numbers={emergencyNumbers} />
//         </div>

//         {/* Community Chat */}
//         <div className="glass-section">
//           <h2>Community Chat</h2>
//           <CommunityChat
//             userName={profile.name}
//             userEmail={profile.email}
//             userPhone={profile.phone}
//             userLocation={profile.location}
//           />
//         </div>

//         {/* Shelters */}
//         <div className="glass-section">
//           <h2>Nearby Shelters</h2>
//           <input
//             type="text"
//             placeholder="Search shelters by name or location..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {filteredShelters.length === 0 ? (
//             <p>No shelters found.</p>
//           ) : (
//             <ul>
//               {filteredShelters.map((s) => (
//                 <li key={s._id}>
//                   <p><strong>{s.name}</strong></p>
//                   <p>Location: {s.location}</p>
//                   <p>Capacity: {s.totalCapacity}, Current Occupancy: {s.currentOccupancy}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Announcements & Weather */}
//         <div className="glass-section">
//           <h2>Important Announcements & Weather</h2>
//           <div className="announcements">
//             {announcements.length === 0 ? (
//               <p>No announcements yet.</p>
//             ) : (
//               announcements.map((n) => (
//                 <div key={n._id} className="announcement-item">
//                   <strong>{n.title}</strong>
//                   <p>{n.description}</p>
//                 </div>
//               ))
//             )}
//           </div>
//           {weather && (
//             <div className="weather-box">
//               <h4>Weather Update</h4>
//               <p>City: {weather.location}</p>
//               <p>Temperature: {weather.temperature}°C</p>
//               <p>Condition: {weather.condition}</p>
//               <p>Wind Speed: {weather.windSpeed} m/s</p>
//               <p>Rain Forecast: {weather.rainForecast} mm</p>
//               <p>Alert: {weather.alert || "None"}</p>
//             </div>
//           )}
//         </div>

//         {/* Community Updates */}
//         <div className="glass-section">
//           <CommunityUpdates user={{ email: profile.email, token: tokenFromState }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VictimDashboard;





import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SOSButton from "../views/SOSButton";
import Modal from "react-modal";
import HelpRequest from "../views/HelpRequest";
import CommunityUpdates from "../views/CommunityUpdates";
import CommunityChat from "../views/CommunityChat";
import "../styles/victimdashboard.css";

Modal.setAppElement("#root");

function VictimDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // -----------------------------
  // Receive email and token from login
  // -----------------------------
  const emailFromState = location.state?.email || "";
  const tokenFromState = location.state?.token || "";

  // -----------------------------
  // Profile state
  // -----------------------------
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const fileInputRef = useRef();

  // -----------------------------
  // Shelters
  // -----------------------------
  const [shelters, setShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // -----------------------------
  // Community updates
  // -----------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [updates, setUpdates] = useState([]);

  // -----------------------------
  // Announcements & weather
  // -----------------------------
  const [announcements, setAnnouncements] = useState([]);
  const [weather, setWeather] = useState(null);

  // -----------------------------
  // Fetch profile
  // -----------------------------
  useEffect(() => {
    if (!emailFromState) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/victim/email/${emailFromState.trim()}`
        );
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [emailFromState]);

  // -----------------------------
  // Fetch shelters safely
  // -----------------------------
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shelters");
        // sanitize location to avoid undefined crash
        const sanitizedShelters = (res.data || []).map((s) => ({
          ...s,
          location: s.location || "Unknown",
        }));
        setShelters(sanitizedShelters);
      } catch (err) {
        console.error("Error fetching shelters:", err);
      }
    };
    fetchShelters();
  }, []);

  // Filter shelters by search term (safe)
  const filteredShelters = shelters.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];

  // -----------------------------
  // Fetch announcements & weather
  // -----------------------------
  useEffect(() => {
    const fetchAnnouncementsWeather = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setAnnouncements(res.data.news || []);
        setWeather(res.data.weather || null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnnouncementsWeather();
  }, []);

  // -----------------------------
  // Handle profile picture update
  // -----------------------------
  const handleProfilePicChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !profile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/victim/profile-pic/${profile._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile(res.data); // update profile immediately
    } catch (err) {
      console.error("Profile picture update failed:", err.response?.data || err.message);
    }
  };

  if (loadingProfile) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found!</p>;

  return (
    <div className="container-victdash">
      {/* Profile & Logout */}
      <div className="profile-corner">
        <img
          src={
            profile.profilePic
              ? `http://localhost:5000/uploads/${profile.profilePic}`
              : "/default-profile.png"
          }
          alt="Profile"
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfilePicChange}
        />
        <div className="profile-info">
          <p><strong>{profile.name}</strong></p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Location: {profile.location}</p>
          <button onClick={() => navigate("/login")}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <h2>Victim Dashboard</h2>

        {/* Emergency Section */}
        <div className="glass-section">
          <h3>Emergency SOS</h3>
          <SOSButton numbers={emergencyNumbers} />
        </div>

        {/* Community Chat */}
        <div className="glass-section">
          <h2>Community Chat</h2>
          <CommunityChat
            userName={profile.name}
            userEmail={profile.email}
            userPhone={profile.phone}
            userLocation={profile.location}
          />
        </div>

        {/* Shelters */}
        <div className="glass-section">
          <h2>Nearby Shelters</h2>
          <input
            type="text"
            placeholder="Search shelters by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredShelters.length === 0 ? (
            <p>No shelters found.</p>
          ) : (
            <ul>
              {filteredShelters.map((s) => (
                <li key={s._id}>
                  <p><strong>{s.name}</strong></p>
                  <p>Location: {s.location}</p>
                  <p>Capacity: {s.totalCapacity}, Current Occupancy: {s.currentOccupancy}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Announcements & Weather */}
        <div className="glass-section">
          <h2>Important Announcements & Weather</h2>
          <div className="announcements">
            {announcements.length === 0 ? (
              <p>No announcements yet.</p>
            ) : (
              announcements.map((n) => (
                <div key={n._id} className="announcement-item">
                  <strong>{n.title}</strong>
                  <p>{n.description}</p>
                </div>
              ))
            )}
          </div>
          {weather && (
            <div className="weather-box">
              <h4>Weather Update</h4>
              <p>City: {weather.location}</p>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Condition: {weather.condition}</p>
              <p>Wind Speed: {weather.windSpeed} m/s</p>
              <p>Rain Forecast: {weather.rainForecast} mm</p>
              <p>Alert: {weather.alert || "None"}</p>
            </div>
          )}
        </div>

        {/* Community Updates */}
        <div className="glass-section">
          <CommunityUpdates user={{ email: profile.email, token: tokenFromState }} />
        </div>
      </div>
    </div>
  );
}

export default VictimDashboard;
