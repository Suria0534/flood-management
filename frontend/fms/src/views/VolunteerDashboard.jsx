
// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import SOSButton from "../views/SOSButton";
// import Modal from "react-modal";
// import CommunityUpdates from "../views/CommunityUpdates";
// import CommunityChat from "../views/CommunityChat";
// import "../styles/volunteersdashboard.css";

// Modal.setAppElement("#root");

// const VolunteerDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const emailFromState = location.state?.email || "";
//   const tokenFromState = location.state?.token || "";

//   // ---------------- Profile ----------------
//   const [profile, setProfile] = useState({
//     name: "",
//     email: emailFromState,
//     phone: "",
//     age: null,
//     skills: "",
//     available: true,
//     location: { coordinates: [0, 0], name: "Unknown Place" },
//     profilePic: "/default-profile.png",
//   });
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const fileInputRef = useRef();

//   // ---------------- Shelters ----------------
//   const [shelters, setShelters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // ---------------- Tasks & Donations ----------------
//   const [tasks, setTasks] = useState([]);
//   const [donationHistory, setDonationHistory] = useState([]);
//   const [showDonationForm, setShowDonationForm] = useState(false);
//   const [donationType, setDonationType] = useState('');
//   const [donationAmount, setDonationAmount] = useState('');
//   const [transactionId, setTransactionId] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);

//   const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];
//   const materialItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

//   // ---------------- Fetch Profile ----------------
//   useEffect(() => {
//     if (!emailFromState) return;
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/volunteer/email/${emailFromState.trim()}`
//         );
//         if (res.data) setProfile(prev => ({ ...prev, ...res.data }));
//       } catch (err) {
//         console.error("Error fetching profile:", err.response?.data || err.message);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };
//     fetchProfile();
//   }, [emailFromState]);

//   // ---------------- Fetch Shelters ----------------
//   useEffect(() => {
//     const fetchShelters = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/shelters");
//         const sanitizedShelters = (res.data || []).map(s => ({
//           ...s,
//           location: s.location || "Unknown",
//         }));
//         setShelters(sanitizedShelters);
//       } catch (err) {
//         console.error("Error fetching shelters:", err);
//       }
//     };
//     fetchShelters();
//   }, []);

//   // ---------------- Fetch Tasks ----------------
//   useEffect(() => {
//     if (!emailFromState) return;
//     axios.get(`http://localhost:5000/api/volunteer-tasks/${emailFromState}`)
//       .then(res => setTasks(res.data || []))
//       .catch(err => console.error(err));
//   }, [emailFromState]);

//   // ---------------- Fetch Donation History ----------------
//   const fetchDonationHistory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/volunteer/donations", {
//         params: { donorEmail: emailFromState }
//       });
//       setDonationHistory([
//         ...(res.data.fundDonations || []),
//         ...(res.data.materialDonations || [])
//       ]);
//     } catch (err) {
//       console.error("Error fetching donation history:", err);
//     }
//   };
//   useEffect(() => { if (emailFromState) fetchDonationHistory(); }, [emailFromState]);

//   // ---------------- Profile Picture Update ----------------
//   const handleProfilePicChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile || !profile._id) return;

//     const formData = new FormData();
//     formData.append("profilePic", selectedFile);

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/volunteer/profile-pic/${profile._id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Profile picture update failed:", err.response?.data || err.message);
//     }
//   };

//   // ---------------- Filter Shelters ----------------
//   const filteredShelters = shelters.filter(
//     s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // ---------------- Donation Handlers ----------------
//   const handleDonateClick = (type) => {
//     setDonationType(type);
//     setShowDonationForm(true);
//     setPhoneNumber("");
//     setTransactionId("");
//     setDonationAmount("");
//     setSelectedItems([]);
//   };

//   const handleCloseDonationForm = () => {
//     setShowDonationForm(false);
//     setDonationType('');
//     setDonationAmount('');
//     setTransactionId('');
//     setPhoneNumber('');
//     setSelectedItems([]);
//   };

//   const handleItemChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setSelectedItems([...selectedItems, value]);
//     else setSelectedItems(selectedItems.filter(i => i !== value));
//   };

//   const handleSubmitDonation = async () => {
//     try {
//       if (!phoneNumber || !transactionId || (!donationAmount && donationType === "fund")) {
//         alert("Please fill all required fields");
//         return;
//       }

//       if (donationType === "fund") {
//         await axios.post(
//           "http://localhost:5000/api/volunteer/donate/fund",
//           {
//             donorEmail: emailFromState,
//             phoneNumber,
//             transactionId,
//             amount: Number(donationAmount)
//           }
//         );
//         alert("Fund donation submitted successfully!");
//       } else if (donationType === "materials") {
//         if (selectedItems.length === 0) {
//           alert("Select at least one item");
//           return;
//         }
//         await axios.post(
//           "http://localhost:5000/api/volunteer/donate/material",
//           {
//             donorName: emailFromState,
//             phone: phoneNumber,
//             items: selectedItems,
//             collectionPlace: transactionId
//           }
//         );
//         alert("Material donation submitted successfully!");
//       }

//       await fetchDonationHistory();
//       handleCloseDonationForm();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Error submitting donation.");
//     }
//   };

//   if (loadingProfile) return <p>Loading profile...</p>;

//   return (
//     <div className="volunteer-dashboard">

//       {/* Profile */}
//       <div className="profile-info">
//         <div className="profile-pic-wrapper">
//           <img
//             src={profile.profilePic ? `http://localhost:5000/uploads/${profile.profilePic}` : "/default-profile.png"}
//             alt="Profile"
//             className="profile-pic"
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleProfilePicChange}
//             style={{ display: "none" }}
//             accept="image/*"
//           />
//           <button onClick={() => fileInputRef.current.click()}>Change Picture</button>
//         </div>

//         <p><strong>{profile.name || "Name"}</strong></p>
//         <p>Email: {profile.email}</p>
//         <p>Phone: {profile.phone || "N/A"}</p>
//         {profile.age && <p>Age: {profile.age}</p>}
//         {profile.skills && <p>Skills: {profile.skills}</p>}
//         <p>Status: {profile.available ? "Available" : "Not Available"}</p>

//         {/* Correct Location */}
//         <p>
//           Location: {
//             typeof profile.location === "string"
//             ? profile.location
//             : profile.location?.name || "Unknown Place"
//           }
//         </p>

//         <button onClick={() => navigate("/login")}>Logout</button>
//       </div>

//       {/* Emergency SOS */}
//       <div className="glass-section">
//         <h2>Emergency SOS</h2>
//         <SOSButton numbers={emergencyNumbers} />
//       </div>

//       {/* Shelters */}
//       <div className="glass-section">
//         <h2>Nearby Shelters</h2>
//         <input
//           type="text"
//           placeholder="Search shelters by name or location..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         {filteredShelters.length === 0 ? <p>No shelters found.</p> :
//           <ul>
//             {filteredShelters.map(s => (
//               <li key={s._id}>
//                 <p><strong>{s.name}</strong></p>
//                 <p>Location: {s.location}</p>
//                 <p>Capacity: {s.totalCapacity}, Occupancy: {s.currentOccupancy}</p>
//               </li>
//             ))}
//           </ul>}
//       </div>

//       {/* Donations */}
//       <div className="glass-section">
//         <h2>Make a Donation</h2>
//         <div className="donation-buttons">
//           <button onClick={() => handleDonateClick('fund')}>Donate Funds</button>
//           <button onClick={() => handleDonateClick('materials')}>Donate Materials</button>
//         </div>

//         {showDonationForm && (
//           <div className="donation-form">
//             <input
//               type="text"
//               placeholder="Phone / Contact"
//               value={phoneNumber}
//               onChange={e => setPhoneNumber(e.target.value)}
//             />
//             <select value={transactionId} onChange={e => setTransactionId(e.target.value)}>
//               <option value="">Select Payment Method</option>
//               <option value="Bkash">Bkash</option>
//               <option value="Nogod">Nogod</option>
//               <option value="Bank">Bank</option>
//             </select>
//             <p>
//               {transactionId === "Bkash" && "Send to: 01840-268794"} 
//               {transactionId === "Nogod" && "Send to: 01840-268794"} 
//               {transactionId === "Rocket" && "Send to: 01840-268794"} 
//               {transactionId === "Bank" && "Send to: BRAC Bank - 123456789"}
//             </p>
//             <input
//               type="text"
//               placeholder={donationType === "fund" ? "Transaction ID" : "Collection Place"}
//               value={transactionId}
//               onChange={e => setTransactionId(e.target.value)}
//             />
//             {donationType === "fund" ? (
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={donationAmount}
//                 onChange={e => setDonationAmount(e.target.value)}
//               />
//             ) : (
//               <div className="material-items">
//                 {materialItems.map(item => (
//                   <label key={item}>
//                     <input
//                       type="checkbox"
//                       value={item}
//                       checked={selectedItems.includes(item)}
//                       onChange={handleItemChange}
//                     />
//                     {item}
//                   </label>
//                 ))}
//               </div>
//             )}
//             <button onClick={handleSubmitDonation}>Submit</button>
//             <button onClick={handleCloseDonationForm}>Cancel</button>
//           </div>
//         )}

//         {/* Donation History */}
//         <div className="donation-history">
//           <h3>Your Donation History</h3>
//           {donationHistory.length === 0 ? <p>No donations yet.</p> :
//             <ul>
//               {donationHistory.map((d, idx) => {
//                 const date = d.createdAt ? new Date(d.createdAt).toLocaleString() : "Unknown date";
//                 if (d.type === "fund") return <li key={idx}>Fund: ${d.amount || 0} - {date}</li>;
//                 return <li key={idx}>Material: {d.items?.join(", ")} - Collected at: {d.collectionPlace || "N/A"} - {date}</li>;
//               })}
//             </ul>}
//         </div>
//       </div>

//       {/* Community Updates */}
//       <div className="glass-section">
//         <CommunityUpdates user={{ email: profile.email, token: tokenFromState || "demoToken" }} />
//       </div>

//       {/* Community Chat */}
//       <CommunityChat
//         userName={profile.name || "Anonymous"}
//         userEmail={profile.email || "N/A"}
//         userPhone={profile.phone || "N/A"}
//         userLocation={profile.location?.name || "Unknown Place"}
//         userRole="Volunteer"
//       />

//     </div>
//   );
// };

// export default VolunteerDashboard;






import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SOSButton from "../views/SOSButton";
import Modal from "react-modal";
import CommunityUpdates from "../views/CommunityUpdates";
import CommunityChat from "../views/CommunityChat";
import "../styles/volunteersdashboard.css";

Modal.setAppElement("#root");

const VolunteerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";
  const tokenFromState = location.state?.token || "";

  // ---------------- Profile ----------------
  const [profile, setProfile] = useState({
    name: "",
    email: emailFromState,
    phone: "",
    age: null,
    skills: "",
    available: true,
    location: { coordinates: [0, 0], name: "Unknown Place" },
    profilePic: "/default-profile.png",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const fileInputRef = useRef();

  // ---------------- Shelters ----------------
  const [shelters, setShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- Tasks & Donations ----------------
  const [tasks, setTasks] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationType, setDonationType] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];
  const materialItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

  // ---------------- Fetch Profile ----------------
  useEffect(() => {
    if (!emailFromState) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/volunteer/email/${emailFromState.trim()}`
        );
        if (res.data)
          setProfile(prev => ({
            ...prev,
            ...res.data,
            location: res.data.location || { coordinates: [0, 0], name: "Unknown Place" }
          }));
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [emailFromState]);

  // ---------------- Fetch Shelters ----------------
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shelters");
        const sanitizedShelters = (res.data || []).map(s => ({
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

  // ---------------- Fetch Tasks ----------------
  useEffect(() => {
    if (!emailFromState) return;
    axios.get(`http://localhost:5000/api/volunteer-tasks/${emailFromState}`)
      .then(res => setTasks(res.data || []))
      .catch(err => console.error(err));
  }, [emailFromState]);

  // ---------------- Fetch Donation History ----------------
  const fetchDonationHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/volunteer/donations", {
        params: { donorEmail: emailFromState }
      });
      setDonationHistory([
        ...(res.data.fundDonations || []),
        ...(res.data.materialDonations || [])
      ]);
    } catch (err) {
      console.error("Error fetching donation history:", err);
    }
  };
  useEffect(() => { if (emailFromState) fetchDonationHistory(); }, [emailFromState]);

  // ---------------- Profile Picture Update ----------------
  const handleProfilePicChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !profile._id) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/volunteer/profile-pic/${profile._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProfile(prev => ({ ...prev, profilePic: res.data.profilePic }));
    } catch (err) {
      console.error("Profile picture update failed:", err.response?.data || err.message);
    }
  };

  // ---------------- Filter Shelters ----------------
  const filteredShelters = shelters.filter(
    s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------- Donation Handlers ----------------
  const handleDonateClick = (type) => {
    setDonationType(type);
    setShowDonationForm(true);
    setPhoneNumber(""); setTransactionId(""); setDonationAmount(""); setSelectedItems([]);
  };
  const handleCloseDonationForm = () => {
    setShowDonationForm(false);
    setDonationType(''); setDonationAmount(''); setTransactionId(''); setPhoneNumber(''); setSelectedItems([]);
  };
  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setSelectedItems([...selectedItems, value]);
    else setSelectedItems(selectedItems.filter(i => i !== value));
  };
  const handleSubmitDonation = async () => {
    try {
      if (!phoneNumber || !transactionId || (!donationAmount && donationType === "fund")) {
        alert("Please fill all required fields"); return;
      }
      if (donationType === "fund") {
        await axios.post("http://localhost:5000/api/volunteer/donate/fund", { donorEmail: emailFromState, phoneNumber, transactionId, amount: Number(donationAmount) });
        alert("Fund donation submitted successfully!");
      } else {
        if (selectedItems.length === 0) { alert("Select at least one item"); return; }
        await axios.post("http://localhost:5000/api/volunteer/donate/material", { donorName: emailFromState, phone: phoneNumber, items: selectedItems, collectionPlace: transactionId });
        alert("Material donation submitted successfully!");
      }
      await fetchDonationHistory(); handleCloseDonationForm();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting donation.");
    }
  };

  if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <div className="volunteer-dashboard">

      {/* Background image */}
      <div className="dashboard-background">

        {/* Profile */}
        <div className="profile-info">
          <div className="profile-pic-wrapper">
            <img
              src={profile.profilePic ? `http://localhost:5000/uploads/${profile.profilePic}` : "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <input type="file" ref={fileInputRef} onChange={handleProfilePicChange} style={{display:'none'}} accept="image/*" />
            <button onClick={() => fileInputRef.current.click()}>Change Picture</button>
          </div>
          <p><strong>{profile.name || "Name"}</strong></p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone || "N/A"}</p>
          {profile.age && <p>Age: {profile.age}</p>}
          {profile.skills && <p>Skills: {profile.skills}</p>}
          <p>Status: {profile.available ? "Available" : "Not Available"}</p>
          <p>Location: {profile.location?.name || "Unknown Place"}</p>
          <button onClick={() => navigate("/login")}>Logout</button>
        </div>

        {/* Emergency SOS */}
        <div className="glass-section">
          <h2>Emergency SOS</h2>
          <SOSButton numbers={emergencyNumbers} />
        </div>

        {/* Shelters */}
        <div className="glass-section">
          <h2>Nearby Shelters</h2>
          <input type="text" placeholder="Search shelters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {filteredShelters.length === 0 ? <p>No shelters found.</p> :
            <ul>{filteredShelters.map(s => (
              <li key={s._id}><strong>{s.name}</strong> - {s.location} (Capacity: {s.totalCapacity}, Occupancy: {s.currentOccupancy})</li>
            ))}</ul>}
        </div>

        {/* Tasks */}
        <div className="glass-section">
          <h2>Assigned Tasks</h2>
          {tasks.length === 0 ? <p>No tasks assigned yet.</p> :
            <ul>{tasks.map(t => <li key={t._id}>{t.title} - {t.description}</li>)}</ul>}
        </div>

        {/* Chat */}
        <div className="glass-section">
          <h2>Community Chat</h2>
          <CommunityChat
            userName={profile.name || "Anonymous"}
            userEmail={profile.email || "N/A"}
            userPhone={profile.phone || "N/A"}
            userLocation={profile.location?.name || "Unknown Place"}
            userRole="Volunteer"
          />
        </div>

        {/* Donations */}
        <div className="glass-section">
          <h2>Make a Donation</h2>
          <div className="donation-buttons">
            <button onClick={() => handleDonateClick('fund')}>Donate Funds</button>
            <button onClick={() => handleDonateClick('materials')}>Donate Materials</button>
          </div>
          {showDonationForm && (
            <div className="donation-form">
              <input type="text" placeholder="Phone / Contact" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} />
              <select value={transactionId} onChange={e=>setTransactionId(e.target.value)}>
                <option value="">Select Payment Method</option>
                <option value="Bkash">Bkash</option>
                <option value="Nogod">Nogod</option>
                <option value="Bank">Bank</option>
              </select>
              <input type="text" placeholder={donationType === "fund" ? "Transaction ID" : "Collection Place"} value={transactionId} onChange={e=>setTransactionId(e.target.value)} />
              {donationType === "fund" && <input type="number" placeholder="Amount" value={donationAmount} onChange={e=>setDonationAmount(e.target.value)} />}
              {donationType === "materials" && (
                <div className="material-items">
                  {materialItems.map(item => (
                    <label key={item}>
                      <input type="checkbox" value={item} checked={selectedItems.includes(item)} onChange={handleItemChange} />
                      {item}
                    </label>
                  ))}
                </div>
              )}
              <button onClick={handleSubmitDonation}>Submit</button>
              <button onClick={handleCloseDonationForm}>Cancel</button>
            </div>
          )}

          {/* Donation History */}
          <div className="donation-history">
            <h3>Your Donation History</h3>
            {donationHistory.length === 0 ? <p>No donations yet.</p> :
              <ul>
                {donationHistory.map((d, idx) => {
                  const date = d.createdAt ? new Date(d.createdAt).toLocaleString() : "Unknown date";
                  if (d.type === "fund") return <li key={idx}>Fund: ${d.amount || 0} - {date}</li>;
                  return <li key={idx}>Material: {d.items?.join(", ")} - Collected at: {d.collectionPlace || "N/A"} - {date}</li>;
                })}
              </ul>}
          </div>
        </div>

        {/* Community Updates */}
        <div className="glass-section">
          <CommunityUpdates user={{ email: profile.email, token: tokenFromState || "demoToken" }} />
        </div>

      </div>
    </div>
  );
};

export default VolunteerDashboard;





// // ... (same imports as your current code)
// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import SOSButton from "../views/SOSButton";
// import Modal from "react-modal";
// import CommunityUpdates from "../views/CommunityUpdates";
// import CommunityChat from "../views/CommunityChat";
// import "../styles/volunteersdashboard.css";

// Modal.setAppElement("#root");

// const VolunteerDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const emailFromState = location.state?.email || "";
//   const tokenFromState = location.state?.token || "";

//   const [profile, setProfile] = useState({
//     name: "",
//     email: emailFromState,
//     phone: "",
//     age: null,
//     skills: "",
//     available: true,
//     location: { coordinates: [0, 0], name: "Unknown Place" },
//     profilePic: "/default-profile.png",
//   });
//   const [loadingProfile, setLoadingProfile] = useState(true);
//   const fileInputRef = useRef();

//   const [shelters, setShelters] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [tasks, setTasks] = useState([]);
//   const [donationHistory, setDonationHistory] = useState([]);
//   const [showDonationForm, setShowDonationForm] = useState(false);
//   const [donationType, setDonationType] = useState('');
//   const [donationAmount, setDonationAmount] = useState('');
//   const [transactionId, setTransactionId] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);

//   const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];
//   const materialItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

//   // ---------------- Fetch Profile ----------------
//   useEffect(() => {
//     if (!emailFromState) return;
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/volunteer/email/${emailFromState.trim()}`);
//         if (res.data)
//           setProfile(prev => ({ ...prev, ...res.data, location: res.data.location || { coordinates: [0,0], name: "Unknown Place" } }));
//       } catch (err) {
//         console.error("Error fetching profile:", err.response?.data || err.message);
//       } finally { setLoadingProfile(false); }
//     };
//     fetchProfile();
//   }, [emailFromState]);

//   // ---------------- Fetch Shelters ----------------
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/shelters")
//       .then(res => setShelters(res.data || []))
//       .catch(err => console.error(err));
//   }, []);

//   // ---------------- Fetch Tasks ----------------
//   const fetchTasks = async () => {
//     if (!emailFromState) return;
//     try {
//       const res = await axios.get(`http://localhost:5000/api/volunteer-tasks/${emailFromState}`);
//       setTasks(res.data || []);
//     } catch (err) { console.error(err); }
//   };
//   useEffect(() => { fetchTasks(); }, [emailFromState]);

//   // ---------------- Fetch Donation History ----------------
//   const fetchDonationHistory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/volunteer/donations", { params: { donorEmail: emailFromState }});
//       setDonationHistory([...(res.data.fundDonations || []), ...(res.data.materialDonations || [])]);
//     } catch (err) { console.error(err); }
//   };
//   useEffect(() => { if (emailFromState) fetchDonationHistory(); }, [emailFromState]);

//   // ---------------- Profile Picture Update ----------------
//   const handleProfilePicChange = async (e) => {
//     const file = e.target.files[0]; if (!file || !profile._id) return;
//     const formData = new FormData(); formData.append("profilePic", file);
//     try {
//       const res = await axios.put(`http://localhost:5000/api/volunteer/profile-pic/${profile._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//       setProfile(prev => ({ ...prev, profilePic: res.data.profilePic }));
//     } catch (err) { console.error(err.response?.data || err.message); }
//   };

//   // ---------------- Mark Task as Complete ----------------
//   const markTaskComplete = async (taskId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/volunteer/complete-task/${taskId}`);
//       fetchTasks(); // refresh tasks
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Error marking task as complete");
//     }
//   };

//   // ---------------- Filter Shelters ----------------
//   const filteredShelters = shelters.filter(s => (s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || s.location?.toLowerCase().includes(searchTerm.toLowerCase())));

//   if (loadingProfile) return <p>Loading profile...</p>;

//   return (
//     <div className="volunteer-dashboard">
//       <div className="dashboard-background">

//         {/* Profile */}
//         <div className="profile-info">
//           <img src={profile.profilePic ? `http://localhost:5000/uploads/${profile.profilePic}` : "/default-profile.png"} alt="Profile" className="profile-pic" />
//           <input type="file" ref={fileInputRef} onChange={handleProfilePicChange} style={{display:'none'}} accept="image/*"/>
//           <button onClick={()=>fileInputRef.current.click()}>Change Picture</button>
//           <p><strong>{profile.name}</strong></p>
//           <p>Email: {profile.email}</p>
//           <p>Phone: {profile.phone}</p>
//           {profile.age && <p>Age: {profile.age}</p>}
//           {profile.skills && <p>Skills: {profile.skills}</p>}
//           <p>Status: {profile.available ? "Available" : "Not Available"}</p>
//           <p>Location: {profile.location?.name || "Unknown Place"}</p>
//           <button onClick={()=>navigate("/login")}>Logout</button>
//         </div>

//         {/* Assigned Tasks (Top) */}
//         <div className="glass-section">
//           <h2>Assigned Tasks</h2>
//           {tasks.length === 0 ? <p>No tasks assigned yet.</p> :
//             <ul>
//               {tasks.map(t => (
//                 <li key={t._id}>
//                   <strong>{t.title}</strong> - {t.description}
//                   {t.completed ? <span style={{color:'green'}}> (Completed)</span> :
//                     <button onClick={()=>markTaskComplete(t._id)}>Mark as Complete</button>}
//                 </li>
//               ))}
//             </ul>
// }</div>

//         {/* Shelters */}
//         <div className="glass-section">
//           <h2>Nearby Shelters</h2>
//           <input type="text" placeholder="Search shelters..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
//           {filteredShelters.length===0 ? <p>No shelters found.</p> :
//             <ul>{filteredShelters.map(s => <li key={s._id}><strong>{s.name}</strong> - {s.location}</li>)}</ul>}
//         </div>

//         {/* Donations */}
//         <div className="glass-section">
//           <h2>Make a Donation</h2>
//           {/* ... same donation form as before ... */}
//         </div>

//         {/* Community Chat & Updates */}
//         <div className="glass-section">
//           <CommunityChat userName={profile.name} userEmail={profile.email} userPhone={profile.phone} userRole="Volunteer" />
//         </div>
//         <div className="glass-section">
//           <CommunityUpdates user={{ email: profile.email, token: tokenFromState || "demoToken" }} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default VolunteerDashboard;
