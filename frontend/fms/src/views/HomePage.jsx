// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import "../styles/homepage.css";

// // const features = [
// //   { icon: '📦', title: 'Resource Tracking', desc: 'Monitor inventory and distribution.', link: '/resources' },
// //   { icon: '📍', title: 'Location Matching', desc: 'Match requests with nearby volunteers/resources.' },
// //   { icon: '💰', title: 'Donation System', desc: 'Manage fund and material donations.' },
// //   { icon: '📰', title: 'News & Updates', desc: 'Important flood info and relief updates.' },
// //   { icon: '💬', title: 'Chat System', desc: 'Communication among stakeholders.' },
// //   { icon: '🛠️', title: 'Admin Dashboard', desc: 'Monitor requests, resources, and activities.', link: '/admin/login' },
// // ];

// // const HomePage = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="homepage">
// //       {/* Hero Section */}
// //       <section className="hero">
// //         <h1>Helping Flood Victims in Real-Time</h1>
// //         <p>Join the community to provide support, aid, and coordination during floods.</p>
// //         <div className="hero-buttons">
// //           <button onClick={() => navigate('/register/victim')}>Register as Victim</button>
// //           <button onClick={() => navigate('/register/volunteer')}>Register as Volunteer</button>
// //           <button onClick={() => navigate('/register/ngo')}>Register as NGO</button>
// //           <button onClick={() => navigate('/register/official')}>Register as Official</button>
// //         </div>

// //         <div className="login-link">
// //           <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
// //         </div>

// //         {/* Admin Login Shortcut */}
// //         <div className="admin-login">
// //           <button onClick={() => navigate('/admin/login')} className="admin-btn">
// //             🔑 Admin Login
// //           </button>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="features">
// //         <h2>Platform Features</h2>
// //         <div className="features-grid">
// //           {features.map((f, idx) => (
// //             <div 
// //               key={idx} 
// //               className="feature-card" 
// //               onClick={() => f.link && navigate(f.link)} 
// //               style={{ cursor: f.link ? 'pointer' : 'default' }}
// //             >
// //               <span className="feature-icon">{f.icon}</span>
// //               <h3>{f.title}</h3>
// //               <p>{f.desc}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       <footer>
// //         <p>© 2025 FloodRelief Hub. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default HomePage;

// // src/views/HomePage.jsx
// // src/views/HomePage.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../styles/homepage.css";

// const features = [
//   { icon: '📦', title: 'Resource Tracking', desc: 'Monitor inventory and distribution.', link: '/resources' },
//   { icon: '📍', title: 'Location Matching', desc: 'Match requests with nearby volunteers/resources.' },
//   { icon: '💰', title: 'Donation System', desc: 'Manage fund and material donations.' },
//   { icon: '📰', title: 'News & Updates', desc: 'Important flood info and relief updates.' },
//   { icon: '💬', title: 'Chat System', desc: 'Communication among stakeholders.' },
//   { icon: '🛠️', title: 'Admin Dashboard', desc: 'Monitor requests, resources, and activities.', link: '/admin/login' },
// ];

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="homepage">
//       {/* Hero Section (unchanged) */}
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
//           <button onClick={() => navigate('/admin/login')} className="admin-btn">
//             🔑 Admin Login
//           </button>
//         </div>
//       </section>

//       {/* Middle Need Help Section */}
//       {/* Middle Need Help Section */}
//     <section className="need-help" onClick={() => navigate('/register/victim')}>
//         <div className="need-help-card">
//           <span className="need-help-icon">🚨</span>
//           <h2>Need Help?</h2>
//       </div>
//     </section>


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
// src/views/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/homepage.css";

const features = [
  // { icon: '📦', title: 'Resource Tracking', desc: 'Monitor inventory and distribution.', link: '/resources' },
  { icon: '📍', title: 'Location Matching', desc: 'Match requests with nearby volunteers/resources.' },
  { icon: '💰', title: 'Donation System', desc: 'Manage fund and material donations.' },
  { icon: '📰', title: 'News & Updates', desc: 'Important flood info and relief updates.' },
  { icon: '💬', title: 'Chat System', desc: 'Communication among stakeholders.' },
  { icon: '🛠️', title: 'Admin Dashboard', desc: 'Monitor requests, resources, and activities.', link: '/admin/login' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);

  // API theke resource gula fetch kora
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources"); 
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
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
          <button onClick={() => navigate('/register/official')}>Register as Official</button>
        </div>

        <div className="login-link">
          <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
        </div>

        <div className="admin-login">
          <button onClick={() => navigate('/admin/login')} className="admin-btn">
            🔑 Admin Login
          </button>
        </div>
      </section>

      {/* Need Help Section */}
      <section className="need-help" onClick={() => navigate('/register/victim')}>
        <div className="need-help-card">
          <span className="need-help-icon">🚨</span>
          <h2>Need Help?</h2>
        </div>
      </section>

      {/* ✅ Resource Section */}
      <section className="resources-hero" onClick={() => navigate('/resources')}>
        <div className="resources-hero-card">
          <span className="resources-hero-icon">📦</span>
          <h2>Resource Tracking</h2>
          <p>Monitor inventory and distribution in real-time.</p>
        </div>
      </section>
      

      {/* Platform Features Section */}
      <section className="features">
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
      </section>

      <footer>
        <p>© 2025 FloodRelief Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
