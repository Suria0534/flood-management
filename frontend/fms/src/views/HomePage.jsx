
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "../styles/homepage.css";

// const features = [
//   { icon: '📍', title: 'Location Matching', desc: 'Match requests with nearby volunteers/resources.' },
//   { icon: '💰', title: 'Donation System', desc: 'Manage fund and material donations.' },
//   { icon: '📰', title: 'News & Updates', desc: 'Important flood info and relief updates.' },
//   { icon: '💬', title: 'Chat System', desc: 'Communication among stakeholders.' },
//   { icon: '🛠️', title: 'Admin Dashboard', desc: 'Monitor requests, resources, and activities.', link: '/admin/login' },
// ];

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [resources, setResources] = useState([]);
//   const [communityUpdates, setCommunityUpdates] = useState([]);
//   const [shelters, setShelters] = useState([]);
//   const [openShelters, setOpenShelters] = useState({});

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/resources");
//         setResources(res.data);
//       } catch (err) { console.error("Error fetching resources:", err); }
//     };

//     const fetchCommunityUpdates = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/community-updates");
//         setCommunityUpdates(res.data);
//       } catch (err) { console.error("Error fetching community updates:", err); }
//     };

//     const fetchShelters = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/shelters");
//         setShelters(res.data);
//       } catch (err) { console.error("Error fetching shelters:", err); }
//     };

//     fetchResources();
//     fetchCommunityUpdates();
//     fetchShelters();
//   }, []);

//   return (
//     <div className="homepage">
//       {/* Hero Section */}
//       <section className="hero">
//         <h1>Helping Flood Victims in Real-Time</h1>
//         <p>Join the community to provide support, aid, and coordination during floods.</p>
//         <div className="hero-buttons">
//           <button onClick={() => navigate('/register/victim')}>Register as Victim</button>
//           <button onClick={() => navigate('/register/volunteer')}>Register as Volunteer</button>
//           <button onClick={() => navigate('/register/ngo')}>Register as NGO</button>
//           <button onClick={() => navigate('/register/official')}>Register as Official</button>
//         </div>
//         <div className="login-link">
//           <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
//         </div>
//         <div className="admin-login">
//           <button onClick={() => navigate('/admin/login')} className="admin-btn">🔑 Admin Login</button>
//         </div>
//       </section>

//       {/* Need Help Section */}
//       <section className="need-help" onClick={() => navigate('/register/victim')}>
//         <div className="need-help-card">
//           <span className="need-help-icon">🚨</span>
//           <h2>Need Help?</h2>
//         </div>
//       </section>

//       {/* Resource Section */}
//       <section className="resources-hero" onClick={() => navigate('/resources')}>
//         <div className="resources-hero-card">
//           <span className="resources-hero-icon">📦</span>
//           <h2>Resource Tracking</h2>
//           <p>Monitor inventory and distribution in real-time.</p>
//         </div>
//       </section>

//       {/* Community Updates Section */}
//       <section className="community-hero">
//         <div className="community-hero-card">
//           <span className="community-hero-icon">📰</span>
//           <h2>Community Updates</h2>
//           <p>Check the latest updates from the community in real-time.</p>
//           <button 
//             onClick={() => navigate('/community')} 
//             style={{
//               marginTop: '20px',
//               padding: '10px 25px',
//               borderRadius: '10px',
//               border:'none',
//               background:'#6b5b95',
//               color:'#fff',
//               cursor:'pointer'
//             }}
//           >
//             View All Updates
//           </button>
//         </div>
//       </section>

//       {/* 🏠 Asroy Kendra (Shelters) Section */}
//       <section className="shelters-section">
//         <h2 className="shelters-title">🏠 Asroy Kendra (Shelters)</h2>
//         {shelters.length === 0 ? (
//           <p>No shelters available.</p>
//         ) : (
//           <div className="shelters-grid">
//             {shelters.map((shelter) => {
//               const availableSlots = shelter.totalCapacity - shelter.currentOccupancy;
//               return (
//                 <div key={shelter._id} className="shelter-card" onClick={() => setOpenShelters(prev => ({ ...prev, [shelter._id]: !prev[shelter._id] }))}>
//                   <div className="shelter-header">
//                     <h3>{shelter.name}</h3>
//                     <span>{openShelters[shelter._id] ? "▲" : "▼"}</span>
//                   </div>
//                   {openShelters[shelter._id] && (
//                     <div className="shelter-details">
//                       <p><strong>Date:</strong> {shelter.date}</p>
//                       <p><strong>Phone:</strong> {shelter.phone}</p>
//                       <p><strong>Total Capacity:</strong> {shelter.totalCapacity}</p>
//                       <p><strong>Current Occupancy:</strong> {shelter.currentOccupancy}</p>
//                       <p><strong>Available Slots:</strong> {availableSlots}</p>
//                       <p><strong>Volunteers Needed:</strong> {shelter.volunteersNeeded}</p>
//                       <p><strong>Items Needed:</strong> {shelter.itemsNeeded.length > 0 ? shelter.itemsNeeded.join(", ") : "None"}</p>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       {/* Platform Features Section */}
//       <section className="features">
//         <h2>Platform Features</h2>
//         <div className="features-grid">
//           {features.map((f, idx) => (
//             <div
//               key={idx}
//               className="feature-card"
//               onClick={() => f.link && navigate(f.link)}
//               style={{ cursor: f.link ? 'pointer' : 'default' }}
//             >
//               <span className="feature-icon">{f.icon}</span>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <footer>
//         <p>© 2025 FloodRelief Hub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DonateSection from "../views/DonateSection";

import "../styles/homepage.css";

const features = [
  { icon: '📍', title: 'Location Matching', desc: 'Match requests with nearby volunteers/resources.' },
  { icon: '💰', title: 'Donation System', desc: 'Manage fund and material donations.' },
  { icon: '📰', title: 'News & Updates', desc: 'Important flood info and relief updates.' },
  { icon: '💬', title: 'Chat System', desc: 'Communication among stakeholders.' },
  { icon: '🛠️', title: 'Admin Dashboard', desc: 'Monitor requests, resources, and activities.', link: '/admin/login' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [communityUpdates, setCommunityUpdates] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [openShelters, setOpenShelters] = useState({});

  // Fetch data from backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources");
        setResources(res.data);
      } catch (err) { console.error("Error fetching resources:", err); }
    };

    const fetchCommunityUpdates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/community-updates");
        setCommunityUpdates(res.data);
      } catch (err) { console.error("Error fetching community updates:", err); }
    };

    const fetchShelters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shelters");
        setShelters(res.data);
      } catch (err) { console.error("Error fetching shelters:", err); }
    };

    fetchResources();
    fetchCommunityUpdates();
    fetchShelters();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>Helping Flood Victims in Real-Time</h1>
        <p>Join the community to provide support, aid, and coordination during floods.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate('/register/victim')}>Register as Victim</button>
          <button onClick={() => navigate('/register/volunteer')}>Register as Volunteer</button>
          <button onClick={() => navigate('/register/ngo')}>Register as NGO</button>
          {/* <button onClick={() => navigate('/register/official')}>Register as Official</button> */}
        </div>
        <div className="login-link">
          <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
        </div>
        <div className="admin-login">
          <button onClick={() => navigate('/admin/login')} className="admin-btn">🔑 Admin Login</button>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="need-help" onClick={() => navigate('/register/victim')}>
        <div className="need-help-card">
          <span className="need-help-icon">🚨</span>
          <h2>Need Help?</h2>
        </div>
      </section>

      {/* Resource Section */}
      <section className="resources-hero" onClick={() => navigate('/resources')}>
        <div className="resources-hero-card">
          <span className="resources-hero-icon">📦</span>
          <h2>Resource Tracking</h2>
          <p>Monitor inventory and distribution in real-time.</p>
        </div>
      </section>

      {/* Important Announcements Section */}
      <section className="announcements-section">
          <div 
            className="announcements-card" 
            onClick={() => navigate('/announcements')} 
            style={{ cursor: 'pointer' }}
          >
            <span className="announcements-icon">📢</span>
            <h2>Important Announcements</h2>
            <p>Click to view all news & weather updates</p>
        </div>
      </section>
      {/* Community Updates Section */}
      <section className="community-hero">
        <div className="community-hero-card">
          <span className="community-hero-icon">📰</span>
          <h2>Community Updates</h2>
          <p>Check the latest updates from the community in real-time.</p>
          <button 
            onClick={() => navigate('/community')} 
            style={{
              marginTop: '20px',
              padding: '10px 25px',
              borderRadius: '10px',
              border:'none',
              background:'#6b5b95',
              color:'#fff',
              cursor:'pointer'
            }}
          >
            View All Updates
          </button>
        </div>
      </section>

      {/* Shelters Section */}
      {/* Shelters Section */}
      <section className="shelters-hero">
        <div className="shelters-hero-card">
          <span className="shelters-hero-icon">🏠</span>
          <h2>Available Shelters</h2>
          <p>Find safe shelters with available slots, capacity, and needed support.</p>
          <button
            onClick={() => navigate('/shelters')}
            style={{
              marginTop: '20px',
              padding: '10px 25px',
              borderRadius: '10px',
              border: 'none',
              background: '#1a3d6c',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            View All Shelters
          </button>
        </div>
      </section>


      {/* Platform Features Section */}
      {/* <section className="features">
        <h2>Platform Features</h2>
        <div className="features-grid">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="feature-card"
              onClick={() => f.link && navigate(f.link)}
              style={{ cursor: f.link ? 'pointer' : 'default' }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* <div>
      {/* Other sections }
      <DonateSection volunteerEmail="test@example.com" />
      </div> */}
      <div>
        <DonateSection volunteerEmail="test@example.com" />
      </div>

      <footer>
        <p>© 2025 FloodRelief Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

