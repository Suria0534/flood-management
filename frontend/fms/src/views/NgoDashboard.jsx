// // import React, { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import axios from "axios";
// // import "../styles/ngodashboard.css";

// // function NGODashboard() {
// //     const location = useLocation();
// //     const ngoEmail = location.state?.email || "No email provided";

// //     const [volunteers, setVolunteers] = useState([]);
// //     const [selectedVolunteer, setSelectedVolunteer] = useState("");
// //     const [selectedTask, setSelectedTask] = useState("");

// //     const tasks = [
// //         "Rescue & Evacuation",
// //         "Shelter Management",
// //         "Food and Water Distribution",
// //         "Medical Assistance",
// //         "Inventory Management",
// //         "Field Coordination",
// //         "Communication and Awareness",
// //     ];

// //     useEffect(() => {
// //         axios
// //             .get("http://localhost:5000/api/volunteers")
// //             .then((res) => setVolunteers(res.data))
// //             .catch((err) => console.error("Failed to fetch volunteers", err));
// //     }, []);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         axios
// //             .post("http://localhost:5000/api/volunteer-task", {
// //                 volunteerEmail: selectedVolunteer,
// //                 task: selectedTask,
// //                 assignedBy: ngoEmail,
// //             })
// //             .then((res) => {
// //                 // alert("Task assigned successfully!");
// //                 setSelectedVolunteer("");
// //                 setSelectedTask("");
// //             })
// //             .catch((err) => {
// //                 console.error("Failed to assign task", err);
// //                 alert("Failed to assign task.");
// //             });
// //     };

// //     return (
// //         <div className="container-ngo">
// //             <h2 className="title-ngo">NGO Dashboard</h2>
// //             <p className="welcome-text-ngo">Welcome, {ngoEmail}</p>

// //             <form onSubmit={handleSubmit} className="form-ngo">
// //                 <label htmlFor="volunteer-select" className="label-ngo">
// //                     Choose Volunteer:
// //                 </label>
// //                 <select
// //                     id="volunteer-select-ngo"
// //                     value={selectedVolunteer}
// //                     onChange={(e) => setSelectedVolunteer(e.target.value)}
// //                     required
// //                     className="select-ngo"
// //                 >
// //                     <option value="">--Select Volunteer--</option>
// //                     {volunteers.map((v, idx) => (
// //                         <option key={idx} value={v.email}>
// //                             {v.email}
// //                         </option>
// //                     ))}
// //                 </select>

// //                 <label htmlFor="task-select" className="label-ngo">
// //                     Assign Task:
// //                 </label>
// //                 <select
// //                     id="task-select"
// //                     value={selectedTask}
// //                     onChange={(e) => setSelectedTask(e.target.value)}
// //                     required
// //                     className="select-ngo"
// //                 >
// //                     <option value="">--Select Task--</option>
// //                     {tasks.map((task, idx) => (
// //                         <option key={idx} value={task}>
// //                             {task}
// //                         </option>
// //                     ))}
// //                 </select>

// //                 <button type="submit" className="button-ngo">
// //                     Assign Task
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default NGODashboard;









// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import CommunityUpdates from "../views/CommunityUpdates";
// // import CommunityChat from "../views/CommunityChat";

// // const NGODashboard = () => {
// //   const [volunteers, setVolunteers] = useState([]);
// //   const [donations, setDonations] = useState([]);
// //   const [shelters, setShelters] = useState([]);
// //   const [showDonationForm, setShowDonationForm] = useState(false);
// //   const [showShelterForm, setShowShelterForm] = useState(false);
// //   const [donationType, setDonationType] = useState('');
// //   const [donorName, setDonorName] = useState('');
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [transactionId, setTransactionId] = useState('');
// //   const [amount, setAmount] = useState('');
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const [items, setItems] = useState([]);
// //   const [collectionPlace, setCollectionPlace] = useState('');
// //   const [taskTitle, setTaskTitle] = useState('');
// //   const [taskDesc, setTaskDesc] = useState('');
// //   const [selectedVolunteer, setSelectedVolunteer] = useState('');
// //   const [shelterName, setShelterName] = useState('');
// //   const [shelterLocation, setShelterLocation] = useState('');
// //   const [shelterCapacity, setShelterCapacity] = useState('');

// //   const materialItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/ngo/volunteers").then(res=>setVolunteers(res.data));
// //     axios.get("http://localhost:5000/api/ngo/donations").then(res=>setDonations(res.data));
// //     axios.get("http://localhost:5000/api/ngo/shelters").then(res=>setShelters(res.data));
// //   }, []);

// //   const handleAssignTask = async () => {
// //     if (!selectedVolunteer || !taskTitle || !taskDesc) return alert("Fill all fields");
// //     await axios.post("http://localhost:5000/api/ngo/assign-task", {
// //       volunteerId: selectedVolunteer,
// //       title: taskTitle,
// //       description: taskDesc
// //     });
// //     alert("Task assigned!");
// //     setTaskTitle(""); setTaskDesc(""); setSelectedVolunteer("");
// //   };

// //   const handleSubmitDonation = async () => {
// //     if (!donorName || !phoneNumber || !donationType) return alert("Fill required fields");
// //     let payload = { donorName, phoneNumber, type: donationType };
// //     if(donationType==="fund") payload={...payload, transactionId, amount:Number(amount), paymentMethod};
// //     else payload={...payload, items, collectionPlace};
// //     await axios.post("http://localhost:5000/api/ngo/donate", payload);
// //     alert("Donation submitted!"); setShowDonationForm(false);
// //   };

// //   const handleShelterAdd = async () => {
// //     if(!shelterName || !shelterLocation || !shelterCapacity) return alert("Fill all fields");
// //     await axios.post("http://localhost:5000/api/ngo/shelters", {name:shelterName, location:shelterLocation, totalCapacity:Number(shelterCapacity)});
// //     alert("Shelter added!"); setShelterName(""); setShelterLocation(""); setShelterCapacity("");
// //     const res = await axios.get("http://localhost:5000/api/ngo/shelters"); setShelters(res.data);
// //   };

// //   const handleItemChange = (e)=>{
// //     const {value, checked} = e.target;
// //     if(checked) setItems([...items,value]); else setItems(items.filter(i=>i!==value));
// //   };

// //   return (
// //     <div>
// //       <h2>Volunteers</h2>
// //       <ul>{volunteers.map(v=> <li key={v._id}>{v.name} - {v.email}</li>)}</ul>

// //       <h3>Assign Task</h3>
// //       <select value={selectedVolunteer} onChange={e=>setSelectedVolunteer(e.target.value)}>
// //         <option value="">Select Volunteer</option>
// //         {volunteers.map(v=> <option key={v._id} value={v._id}>{v.name}</option>)}
// //       </select>
// //       <input placeholder="Task Title" value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} />
// //       <input placeholder="Task Description" value={taskDesc} onChange={e=>setTaskDesc(e.target.value)} />
// //       <button onClick={handleAssignTask}>Assign Task</button>

// //       <h3>Donations</h3>
// //       <button onClick={()=>setShowDonationForm(!showDonationForm)}>Add Donation</button>
// //       {showDonationForm && (
// //         <div>
// //           <select value={donationType} onChange={e=>setDonationType(e.target.value)}>
// //             <option value="">Select Type</option>
// //             <option value="fund">Fund</option>
// //             <option value="material">Material</option>
// //           </select>
// //           <input placeholder="Donor Name" value={donorName} onChange={e=>setDonorName(e.target.value)} />
// //           <input placeholder="Phone" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} />
// //           {donationType==="fund" && <>
// //             <input placeholder="Transaction ID" value={transactionId} onChange={e=>setTransactionId(e.target.value)} />
// //             <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
// //             <input placeholder="Payment Method" value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)} />
// //           </>}
// //           {donationType==="material" && <>
// //             <input placeholder="Collection Place" value={collectionPlace} onChange={e=>setCollectionPlace(e.target.value)} />
// //             {materialItems.map(item=>(
// //               <label key={item}>
// //                 <input type="checkbox" value={item} checked={items.includes(item)} onChange={handleItemChange} />
// //                 {item}
// //               </label>
// //             ))}
// //           </>}
// //           <button onClick={handleSubmitDonation}>Submit</button>
// //         </div>
// //       )}

// //       <h3>All Donations</h3>
// //       <ul>{donations.map(d=> <li key={d._id}>{d.type==="fund"?`Fund: ${d.amount} - ${d.donorName}`:`Material: ${d.items.join(", ")} - ${d.donorName}`}</li>)}</ul>

// //       <h3>Shelters</h3>
// //       <button onClick={()=>setShowShelterForm(!showShelterForm)}>Add Shelter</button>
// //       {showShelterForm && (
// //         <div>
// //           <input placeholder="Shelter Name" value={shelterName} onChange={e=>setShelterName(e.target.value)} />
// //           <input placeholder="Location" value={shelterLocation} onChange={e=>setShelterLocation(e.target.value)} />
// //           <input placeholder="Total Capacity" value={shelterCapacity} onChange={e=>setShelterCapacity(e.target.value)} />
// //           <button onClick={handleShelterAdd}>Add</button>
// //         </div>
// //       )}
// //       <ul>{shelters.map(s=> <li key={s._id}>{s.name} - {s.location} (Capacity: {s.totalCapacity})</li>)}</ul>

// //       <h3>Community Updates</h3>
// //       <CommunityUpdates user={{ email:"ngo@example.com", token:"demoToken" }} />
// //       <h3>Community Chat</h3>
// //       <CommunityChat userName="NGO" userEmail="ngo@example.com" userPhone="N/A" userRole="NGO" />
// //     </div>
// //   );
// // };

// // export default NGODashboard;






// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/ngoDashboard.css";
// import CommunityChat from "../views/CommunityChat";
// import CommunityUpdates from "../views/CommunityUpdates";

// const NgoDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const ngoEmail = location.state?.email || "";

//   const [profile, setProfile] = useState({ name: "NGO", email: ngoEmail });
//   const [volunteers, setVolunteers] = useState([]);
//   const [selectedVolunteerId, setSelectedVolunteerId] = useState("");
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDesc, setTaskDesc] = useState("");

//   const [donationType, setDonationType] = useState("fund");
//   const [donorName, setDonorName] = useState("");
//   const [donorPhone, setDonorPhone] = useState("");
//   const [donationAmount, setDonationAmount] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [donations, setDonations] = useState([]);

//   const [shelters, setShelters] = useState([]);
//   const [shelterName, setShelterName] = useState("");
//   const [shelterLocation, setShelterLocation] = useState("");
//   const [searchShelter, setSearchShelter] = useState("");

//   // ---------------- Fetch volunteers ----------------
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/ngo/volunteers")
//       .then(res => setVolunteers(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // ---------------- Fetch donations ----------------
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/ngo/donations")
//       .then(res => setDonations(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // ---------------- Fetch shelters ----------------
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/shelters")
//       .then(res => setShelters(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // ---------------- Assign Task ----------------
//   const handleAssignTask = async () => {
//     if (!selectedVolunteerId || !taskTitle) {
//       alert("Select volunteer & enter task title");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:5000/api/ngo/assign-task", {
//         volunteerId: selectedVolunteerId,
//         title: taskTitle,
//         description: taskDesc,
//         assignedBy: ngoEmail
//       });
//       alert("Task assigned!");
//       setTaskTitle(""); setTaskDesc(""); setSelectedVolunteerId("");
//     } catch (err) {
//       console.error(err);
//       alert("Error assigning task");
//     }
//   };

//   // ---------------- Submit Donation ----------------
//   const handleSubmitDonation = async () => {
//     if (!donorName || !donorPhone || (donationType === "fund" && !donationAmount) || !paymentMethod) {
//       alert("Fill all fields");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:5000/api/ngo/donate", {
//         type: donationType,
//         donorName,
//         donorEmail: "",
//         phoneNumber: donorPhone,
//         transactionId: "manual",
//         paymentMethod,
//         amount: donationType === "fund" ? Number(donationAmount) : undefined
//       });
//       alert("Donation recorded");
//       setDonorName(""); setDonorPhone(""); setDonationAmount("");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting donation");
//     }
//   };

//   // ---------------- Add Shelter ----------------
//   const handleAddShelter = async () => {
//     if (!shelterName || !shelterLocation) {
//       alert("Fill all fields");
//       return;
//     }
//     try {
//       await axios.post("http://localhost:5000/api/shelters", {
//         name: shelterName,
//         location: shelterLocation
//       });
//       alert("Shelter added!");
//       setShelterName(""); setShelterLocation("");
//       const res = await axios.get("http://localhost:5000/api/shelters");
//       setShelters(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Error adding shelter");
//     }
//   };

//   const filteredShelters = shelters.filter(s => s.name.toLowerCase().includes(searchShelter.toLowerCase()) || s.location.toLowerCase().includes(searchShelter.toLowerCase()));

//   return (
//     <div className="ngo-dashboard">
//       <div className="header">
//         <h1>Welcome, {profile.name}</h1>
//         <p>Email: {profile.email}</p>
//         <button onClick={() => navigate("/login")}>Logout</button>
//       </div>

//       <div className="section">
//         <h2>Volunteers</h2>
//         <select value={selectedVolunteerId} onChange={e => setSelectedVolunteerId(e.target.value)}>
//           <option value="">Select Volunteer</option>
//           {volunteers.map(v => (
//             <option key={v._id} value={v._id}>{v.name} ({v.email})</option>
//           ))}
//         </select>
//         <input type="text" placeholder="Task title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
//         <input type="text" placeholder="Task description" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} />
//         <button onClick={handleAssignTask}>Assign Task</button>
//       </div>

//       <div className="section">
//         <h2>Donations</h2>
//         <select value={donationType} onChange={e => setDonationType(e.target.value)}>
//           <option value="fund">Fund</option>
//           <option value="material">Material</option>
//         </select>
//         <input type="text" placeholder="Donor Name" value={donorName} onChange={e => setDonorName(e.target.value)} />
//         <input type="text" placeholder="Phone" value={donorPhone} onChange={e => setDonorPhone(e.target.value)} />
//         {donationType === "fund" && <input type="number" placeholder="Amount" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} />}
//         <input type="text" placeholder="Payment Method" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} />
//         <button onClick={handleSubmitDonation}>Submit Donation</button>

//         <h3>All Donations</h3>
//         <ul>
//           {donations.map(d => (
//             <li key={d._id}>
//               {d.type === "fund" ? `Fund: ${d.amount} - ${d.donorName}` : `Material: ${d.items?.join(", ")} - ${d.donorName}`}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="section">
//         <h2>Shelters</h2>
//         <input type="text" placeholder="Search shelter..." value={searchShelter} onChange={e => setSearchShelter(e.target.value)} />
//         <ul>
//           {filteredShelters.map(s => <li key={s._id}>{s.name} - {s.location}</li>)}
//         </ul>
//         <input type="text" placeholder="Shelter Name" value={shelterName} onChange={e => setShelterName(e.target.value)} />
//         <input type="text" placeholder="Location" value={shelterLocation} onChange={e => setShelterLocation(e.target.value)} />
//         <button onClick={handleAddShelter}>Add Shelter</button>
//       </div>

//       <div className="section">
//         <h2>Community Updates</h2>
//         <CommunityUpdates user={{ email: profile.email, role: "NGO" }} />
//       </div>

//       <div className="section">
//         <h2>Community Chat</h2>
//         <CommunityChat userName={profile.name} userEmail={profile.email} userRole="NGO" />
//       </div>
//     </div>
//   );
// };

// export default NgoDashboard;



import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SOSButton from "../views/SOSButton";
import Modal from "react-modal";
import CommunityUpdates from "../views/CommunityUpdates";
import CommunityChat from "../views/CommunityChat";
import "../styles/ngoDashboard.css";

Modal.setAppElement("#root");

const NgoDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || "";
  const tokenFromState = location.state?.token || "";

  // ---------------- Profile ----------------
  const [profile, setProfile] = useState({
    name: "",
    email: emailFromState,
    phone: "",
    profilePic: "/default-profile.png",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ---------------- Volunteers ----------------
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  // ---------------- Tasks ----------------
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);

  // ---------------- Shelters ----------------
  const [shelters, setShelters] = useState([]);
  const [searchShelter, setSearchShelter] = useState("");

  // ---------------- Donation ----------------
  const [donations, setDonations] = useState([]);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationType, setDonationType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const materialItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

  const emergencyNumbers = ["+8801840268794", "+8801531982970", "+8801580602149"];

  // ---------------- Fetch Profile ----------------
  useEffect(() => {
    if (!emailFromState) return;
    axios.get(`http://localhost:5000/api/ngo/profile/${emailFromState}`)
      .then(res => setProfile(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoadingProfile(false));
  }, [emailFromState]);

  // ---------------- Fetch Volunteers ----------------
  useEffect(() => {
    axios.get("http://localhost:5000/api/ngo/volunteers")
      .then(res => setVolunteers(res.data))
      .catch(err => console.error(err));
  }, []);

  // ---------------- Fetch Assigned Tasks ----------------
  useEffect(() => {
    axios.get("http://localhost:5000/api/ngo/assigned-tasks")
      .then(res => setAssignedTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // ---------------- Fetch Shelters ----------------
  useEffect(() => {
    axios.get("http://localhost:5000/api/shelters")
      .then(res => setShelters(res.data))
      .catch(err => console.error(err));
  }, []);

  // ---------------- Fetch Donations ----------------
  useEffect(() => {
    axios.get("http://localhost:5000/api/ngo/donations")
      .then(res => setDonations(res.data))
      .catch(err => console.error(err));
  }, []);

  // ---------------- Assign Task ----------------
  const handleAssignTask = async () => {
    if (!selectedVolunteer || !taskTitle) {
      alert("Select volunteer and enter task title");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/ngo/assign-task", {
        volunteerId: selectedVolunteer,
        title: taskTitle,
        description: taskDescription,
        assignedBy: profile.email
      });
      setAssignedTasks(prev => [...prev, res.data]);
      setTaskTitle(""); setTaskDescription(""); setSelectedVolunteer("");
      alert("Task assigned successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error assigning task");
    }
  };

  // ---------------- Donation Handlers ----------------
  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setSelectedItems([...selectedItems, value]);
    else setSelectedItems(selectedItems.filter(i => i !== value));
  };

  const handleSubmitDonation = async () => {
    if (!donationType || !phoneNumber || !transactionId || (donationType==="fund" && !donationAmount) || (donationType==="material" && selectedItems.length===0)) {
      alert("Fill all required fields");
      return;
    }
    try {
      const payload = {
        type: donationType,
        donorName: profile.name || profile.email, // যদি নাম না থাকে, email ব্যবহার করো
        donorEmail: profile.email || profile.name,
        phoneNumber,
        transactionId,
        amount: donationType==="fund"?Number(donationAmount):undefined,
        items: donationType==="material"?selectedItems:undefined
      };
      const res = await axios.post("http://localhost:5000/api/ngo/donate", payload);
      setDonations(prev => [res.data, ...prev]);
      setShowDonationForm(false);
      setDonationType(""); setPhoneNumber(""); setTransactionId(""); setDonationAmount(""); setSelectedItems([]);
      alert("Donation submitted!");
    } catch(err){
      console.error(err.response?.data || err.message);
      alert("Error submitting donation");
    }
  };

  // ---------------- Filter Shelters (Safe) ----------------
  const filteredShelters = shelters.filter(s => {
    const name = s.name || "";
    const location = s.location || "";
    return name.toLowerCase().includes(searchShelter.toLowerCase()) ||
           location.toLowerCase().includes(searchShelter.toLowerCase());
  });

  if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <div className="ngo-dashboard">
      <div className="profile-section">
        <img src={profile.profilePic || "/default-profile.png"} alt="Profile" />
        <p><strong>{profile.name}</strong></p>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phone}</p>
        <button onClick={()=>navigate("/login")}>Logout</button>
      </div>

      {/* Volunteer List & Task Assign */}
      <div className="glass-section">
        <h2>Registered Volunteers</h2>
        <select value={selectedVolunteer} onChange={e=>setSelectedVolunteer(e.target.value)}>
          <option value="">Select Volunteer</option>
          {volunteers.map(v => <option key={v._id} value={v._id}>{v.name} ({v.email})</option>)}
        </select>
        <input type="text" placeholder="Task Title" value={taskTitle} onChange={e=>setTaskTitle(e.target.value)} />
        <input type="text" placeholder="Task Description" value={taskDescription} onChange={e=>setTaskDescription(e.target.value)} />
        <button onClick={handleAssignTask}>Assign Task</button>

        <h3>Assigned Tasks</h3>
        <ul>
          {assignedTasks.map(t => (
            <li key={t._id}>{t.title} - {t.description} (Volunteer: {t.volunteerName})</li>
          ))}
        </ul>
      </div>

      {/* Shelters */}
      <div className="glass-section">
        <h2>Nearby Shelters</h2>
        <input type="text" placeholder="Search shelters..." value={searchShelter} onChange={e=>setSearchShelter(e.target.value)} />
        <ul>
          {filteredShelters.map(s => (
            <li key={s._id}>{s.name} - {s.location}</li>
          ))}
        </ul>
      </div>

      {/* Donations */}
      <div className="glass-section">
        <h2>Donations</h2>
        <button onClick={()=>setShowDonationForm(true)}>Add Donation</button>
        {showDonationForm && (
          <div className="donation-form">
            <select value={donationType} onChange={e=>setDonationType(e.target.value)}>
              <option value="">Select Type</option>
              <option value="fund">Fund</option>
              <option value="material">Material</option>
            </select>
            <input type="text" placeholder="Phone" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} />
            <input type="text" placeholder={donationType==="fund"?"Transaction ID":"Collection Place"} value={transactionId} onChange={e=>setTransactionId(e.target.value)} />
            {donationType==="fund" && <input type="number" placeholder="Amount" value={donationAmount} onChange={e=>setDonationAmount(e.target.value)} />}
            {donationType==="material" && materialItems.map(item=>(
              <label key={item}><input type="checkbox" value={item} checked={selectedItems.includes(item)} onChange={handleItemChange}/> {item}</label>
            ))}
            <button onClick={handleSubmitDonation}>Submit</button>
            <button onClick={()=>setShowDonationForm(false)}>Cancel</button>
          </div>
        )}
        <h3>Donation History</h3>
        <ul>
          {donations.map(d => (
            <li key={d._id}>
              {d.type==="fund" ? `Fund: ${d.amount} - ${d.phoneNumber}` : `Material: ${d.items?.join(", ")} - ${d.phoneNumber}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Community Chat & Updates */}
      <div className="glass-section">
        <CommunityChat userName={profile.name} userEmail={profile.email} userPhone={profile.phone} userRole="NGO"/>
      </div>
      <div className="glass-section">
        <CommunityUpdates user={{ email: profile.email, token: tokenFromState || "demoToken" }} />
      </div>
    </div>
  );
};

export default NgoDashboard;
