// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";

// // // // const ShelterDashboard = ({ user }) => {
// // // //   const [shelters, setShelters] = useState([]);
// // // //   const [editing, setEditing] = useState(null);
// // // //   const [form, setForm] = useState({});

// // // //   const token = localStorage.getItem("adminToken");
// // // //   const headers = { Authorization: `Bearer ${token}` };

// // // //   // Fetch shelters
// // // //   const fetchShelters = async () => {
// // // //     try {
// // // //       const res = await axios.get("http://localhost:5000/api/shelters", { headers });
// // // //       setShelters(res.data);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchShelters();
// // // //     const interval = setInterval(fetchShelters, 5000);
// // // //     return () => clearInterval(interval);
// // // //   }, []);

// // // //   // Start editing a shelter
// // // //   const handleEdit = (shelter) => {
// // // //     setEditing(shelter._id);
// // // //     setForm({
// // // //       name: shelter.name || "",
// // // //       phone: shelter.phone || "",
// // // //       totalCapacity: shelter.totalCapacity || 0,
// // // //       currentOccupancy: shelter.currentOccupancy || 0,
// // // //       volunteersNeeded: shelter.volunteersNeeded || 0,
// // // //       itemsNeeded: shelter.itemsNeeded?.join(", ") || "",
// // // //     });
// // // //   };

// // // //   // Handle form changes
// // // //   const handleChange = (e) => {
// // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // //   };

// // // //   // Save edited shelter
// // // //   const handleSave = async () => {
// // // //     try {
// // // //       const payload = {
// // // //         ...form,
// // // //         itemsNeeded: form.itemsNeeded.split(",").map(i => i.trim()),
// // // //       };
// // // //       await axios.put(`http://localhost:5000/api/shelters/${editing}`, payload, { headers });
// // // //       setEditing(null);
// // // //       fetchShelters();
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Update failed!");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="shelter-dashboard">
// // // //       {shelters.map(s => (
// // // //         <div key={s._id} className="shelter-card">
// // // //           {editing === s._id ? (
// // // //             <>
// // // //               <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
// // // //               <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
// // // //               <input
// // // //                 name="totalCapacity"
// // // //                 type="number"
// // // //                 value={form.totalCapacity}
// // // //                 onChange={handleChange}
// // // //                 placeholder="Total Capacity"
// // // //               />
// // // //               <input
// // // //                 name="currentOccupancy"
// // // //                 type="number"
// // // //                 value={form.currentOccupancy}
// // // //                 onChange={handleChange}
// // // //                 placeholder="Current Occupancy"
// // // //               />
// // // //               <input
// // // //                 name="volunteersNeeded"
// // // //                 type="number"
// // // //                 value={form.volunteersNeeded}
// // // //                 onChange={handleChange}
// // // //                 placeholder="Volunteers Needed"
// // // //               />
// // // //               <input
// // // //                 name="itemsNeeded"
// // // //                 value={form.itemsNeeded}
// // // //                 onChange={handleChange}
// // // //                 placeholder="Items Needed (comma separated)"
// // // //               />
// // // //               <button onClick={handleSave}>Save</button>
// // // //               <button onClick={() => setEditing(null)}>Cancel</button>
// // // //             </>
// // // //           ) : (
// // // //             <>
// // // //               <h3>{s.name}</h3>
// // // //               <p>Phone: {s.phone}</p>
// // // //               <p>Capacity: {s.currentOccupancy}/{s.totalCapacity}</p>
// // // //               <p>Volunteers: {s.volunteersAssigned?.map(v => v.name).join(", ") || "None"}</p>
// // // //               <p>Items: {s.itemsNeeded.join(", ")}</p>
// // // //               {user?.role === "admin" && <button onClick={() => handleEdit(s)}>Edit</button>}
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ShelterDashboard;



// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const ShelterDashboard = ({ user }) => {
// // //   const [shelters, setShelters] = useState([]);
// // //   const [editing, setEditing] = useState(null);
// // //   const [form, setForm] = useState({});

// // //   const token = localStorage.getItem("adminToken");
// // //   const headers = { Authorization: `Bearer ${token}` };

// // //   // Fetch shelters
// // //   const fetchShelters = async () => {
// // //     try {
// // //       const res = await axios.get("http://localhost:5000/api/shelters", { headers });
// // //       setShelters(res.data);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchShelters();
// // //     const interval = setInterval(fetchShelters, 5000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   // Start editing a shelter
// // //   const handleEdit = (shelter) => {
// // //     setEditing(shelter._id);
// // //     setForm({
// // //       name: shelter.name || "",
// // //       phone: shelter.phone || "",
// // //       totalCapacity: shelter.totalCapacity || 0,
// // //       currentOccupancy: shelter.currentOccupancy || 0,
// // //       volunteersNeeded: shelter.volunteersNeeded || 0,
// // //       itemsNeeded: shelter.itemsNeeded?.join(", ") || "",
// // //       date: shelter.date || "",
// // //     });
// // //   };

// // //   // Handle form changes
// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   // Save edited shelter
// // //   const handleSave = async () => {
// // //     try {
// // //       const payload = {
// // //         ...form,
// // //         itemsNeeded: form.itemsNeeded
// // //           ? form.itemsNeeded.split(",").map(i => i.trim()).filter(Boolean)
// // //           : [],
// // //       };
// // //       await axios.put(`http://localhost:5000/api/shelters/${editing}`, payload, { headers });
// // //       setEditing(null);
// // //       fetchShelters();
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Update failed!");
// // //     }
// // //   };

// // //   return (
// // //     <div className="shelter-dashboard">
// // //       {shelters.map(s => (
// // //         <div key={s._id} className="shelter-card">
// // //           {editing === s._id ? (
// // //             <>
// // //               <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
// // //               <input name="date" value={form.date} onChange={handleChange} placeholder="Date" />
// // //               <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
// // //               <input
// // //                 name="totalCapacity"
// // //                 type="number"
// // //                 value={form.totalCapacity}
// // //                 onChange={handleChange}
// // //                 placeholder="Total Capacity"
// // //               />
// // //               <input
// // //                 name="currentOccupancy"
// // //                 type="number"
// // //                 value={form.currentOccupancy}
// // //                 onChange={handleChange}
// // //                 placeholder="Current Occupancy"
// // //               />
// // //               <input
// // //                 name="volunteersNeeded"
// // //                 type="number"
// // //                 value={form.volunteersNeeded}
// // //                 onChange={handleChange}
// // //                 placeholder="Volunteers Needed"
// // //               />
// // //               <input
// // //                 name="itemsNeeded"
// // //                 value={form.itemsNeeded}
// // //                 onChange={handleChange}
// // //                 placeholder="Items Needed (comma separated)"
// // //               />
// // //               <button onClick={handleSave}>Save</button>
// // //               <button onClick={() => setEditing(null)}>Cancel</button>
// // //             </>
// // //           ) : (
// // //             <>
// // //               <h3>{s.name}</h3>
// // //               <p>Date: {s.date}</p>
// // //               <p>Phone: {s.phone}</p>
// // //               <p>Capacity: {s.currentOccupancy}/{s.totalCapacity}</p>
// // //               <p>Volunteers Needed: {s.volunteersNeeded}</p>
// // //               <p>Items Needed: {s.itemsNeeded.join(", ") || "None"}</p>
// // //               {user?.role === "admin" && <button onClick={() => handleEdit(s)}>Edit</button>}
// // //             </>
// // //           )}
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default ShelterDashboard;




// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const ShelterDashboard = () => {
// //   const [shelters, setShelters] = useState([]);

// //   useEffect(() => {
// //     const fetchShelters = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/shelters"); // backend থেকে সব data
// //         setShelters(res.data);
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     fetchShelters();
// //   }, []);

// //   return (
// //     <div className="shelter-dashboard">
// //       <h1>🏠 Asroy Kendra (Shelters)</h1>
// //       {shelters.length === 0 ? (
// //         <p>No shelters available.</p>
// //       ) : (
// //         shelters.map((s) => (
// //           <div key={s._id} className="shelter-card">
// //             <h3>{s.name}</h3>
// //             <p><strong>Date:</strong> {s.date}</p>
// //             <p><strong>Phone:</strong> {s.phone}</p>
// //             <p><strong>Total Capacity:</strong> {s.totalCapacity}</p>
// //             <p><strong>Current Occupancy:</strong> {s.currentOccupancy}</p>
// //             <p><strong>Available Slots:</strong> {s.totalCapacity - s.currentOccupancy}</p>
// //             <p><strong>Volunteers Needed:</strong> {s.volunteersNeeded}</p>
// //             <p><strong>Items Needed:</strong> {s.itemsNeeded.join(", ") || "None"}</p>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // export default ShelterDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ShelterDashboard = () => {
//   const [shelters, setShelters] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({});

//   // Fetch all shelters
//   const fetchShelters = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/shelters");
//       setShelters(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchShelters();
//   }, []);

//   // Start editing a shelter
//   const handleEdit = (shelter) => {
//     setEditingId(shelter._id);
//     setForm({
//       name: shelter.name || "",
//       date: shelter.date || "",
//       phone: shelter.phone || "",
//       totalCapacity: shelter.totalCapacity || 0,
//       currentOccupancy: shelter.currentOccupancy || 0,
//       volunteersNeeded: shelter.volunteersNeeded || 0,
//       itemsNeeded: shelter.itemsNeeded?.join(", ") || "",
//     });
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Save updates
//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...form,
//         itemsNeeded: form.itemsNeeded.split(",").map(i => i.trim()),
//       };
//       await axios.put(`http://localhost:5000/api/shelters/${editingId}`, payload);
//       setEditingId(null);
//       fetchShelters(); // Refresh data
//     } catch (err) {
//       console.error(err);
//       alert("Update failed!");
//     }
//   };

//   return (
//     <div className="shelter-dashboard">
//       <h1>🏠 Asroy Kendra (Shelters)</h1>
//       {shelters.length === 0 ? (
//         <p>No shelters available.</p>
//       ) : (
//         shelters.map((s) => (
//           <div key={s._id} className="shelter-card">
//             {editingId === s._id ? (
//               <>
//                 <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
//                 <input name="date" value={form.date} onChange={handleChange} placeholder="Date" />
//                 <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
//                 <input name="totalCapacity" type="number" value={form.totalCapacity} onChange={handleChange} placeholder="Total Capacity" />
//                 <input name="currentOccupancy" type="number" value={form.currentOccupancy} onChange={handleChange} placeholder="Current Occupancy" />
//                 <input name="volunteersNeeded" type="number" value={form.volunteersNeeded} onChange={handleChange} placeholder="Volunteers Needed" />
//                 <input name="itemsNeeded" value={form.itemsNeeded} onChange={handleChange} placeholder="Items Needed (comma separated)" />
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={() => setEditingId(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <h3>{s.name}</h3>
//                 <p><strong>Date:</strong> {s.date}</p>
//                 <p><strong>Phone:</strong> {s.phone}</p>
//                 <p><strong>Total Capacity:</strong> {s.totalCapacity}</p>
//                 <p><strong>Current Occupancy:</strong> {s.currentOccupancy}</p>
//                 <p><strong>Available Slots:</strong> {s.totalCapacity - s.currentOccupancy}</p>
//                 <p><strong>Volunteers Needed:</strong> {s.volunteersNeeded}</p>
//                 <p><strong>Items Needed:</strong> {s.itemsNeeded.join(", ") || "None"}</p>
//                 <button onClick={() => handleEdit(s)}>Edit</button>
//               </>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ShelterDashboard;










// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ShelterDashboard = ({ user }) => {
//   const [shelters, setShelters] = useState([]);
//   const [openShelters, setOpenShelters] = useState({}); // কোন shelter খোলা আছে
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState({});

//   const token = localStorage.getItem("adminToken");
//   const headers = token ? { Authorization: `Bearer ${token}` } : {};

//   // Fetch shelters
//   const fetchShelters = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/shelters", { headers });
//       setShelters(res.data);
//     } catch (err) {
//       console.error("Error fetching shelters:", err);
//     }
//   };

//   useEffect(() => {
//     fetchShelters();
//   }, []);

//   // Open/Close shelter details
//   const toggleOpen = (id) => {
//     setOpenShelters(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   // Admin: start editing
//   const handleEdit = (shelter) => {
//     setEditing(shelter._id);
//     setForm({
//       name: shelter.name,
//       date: shelter.date,
//       phone: shelter.phone,
//       totalCapacity: shelter.totalCapacity,
//       currentOccupancy: shelter.currentOccupancy,
//       volunteersNeeded: shelter.volunteersNeeded,
//       itemsNeeded: shelter.itemsNeeded.join(", "),
//     });
//   };

//   // Handle form input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Admin: save edited shelter
//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...form,
//         itemsNeeded: form.itemsNeeded.split(",").map(i => i.trim()),
//       };
//       await axios.put(`http://localhost:5000/api/shelters/${editing}`, payload, { headers });
//       setEditing(null);
//       fetchShelters();
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Update failed!");
//     }
//   };

//   // Admin: delete shelter
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete this shelter?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/shelters/${id}`, { headers });
//       fetchShelters();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       alert("Delete failed!");
//     }
//   };

//   return (
//     <div className="community-hero shelter-dashboard">
//       <div className="community-hero-card" style={{ maxWidth: "700px" }}>
//         <h1>🏠 Asroy Kendra (Shelters)</h1>

//         {shelters.length === 0 ? (
//           <p>No shelters available.</p>
//         ) : (
//           shelters.map((s) => {
//             const availableSlots = s.totalCapacity - s.currentOccupancy;
//             return (
//               <div key={s._id} className="shelter-card" style={{ marginBottom: "20px", textAlign: "left" }}>
//                 <div
//                   onClick={() => toggleOpen(s._id)}
//                   style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
//                 >
//                   <h3>{s.name}</h3>
//                   <span>{openShelters[s._id] ? "▲" : "▼"}</span>
//                 </div>

//                 {openShelters[s._id] && (
//                   <div className="shelter-details" style={{ paddingLeft: "15px", marginTop: "10px" }}>
//                     {editing === s._id ? (
//                       <>
//                         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
//                         <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
//                         <input name="date" value={form.date} onChange={handleChange} placeholder="Date" />
//                         <input name="totalCapacity" type="number" value={form.totalCapacity} onChange={handleChange} placeholder="Total Capacity" />
//                         <input name="currentOccupancy" type="number" value={form.currentOccupancy} onChange={handleChange} placeholder="Current Occupancy" />
//                         <input name="volunteersNeeded" type="number" value={form.volunteersNeeded} onChange={handleChange} placeholder="Volunteers Needed" />
//                         <input name="itemsNeeded" value={form.itemsNeeded} onChange={handleChange} placeholder="Items Needed (comma separated)" />
//                         <button onClick={handleSave}>Save</button>
//                         <button onClick={() => setEditing(null)}>Cancel</button>
//                       </>
//                     ) : (
//                       <>
//                         <p><strong>Date:</strong> {s.date}</p>
//                         <p><strong>Phone:</strong> {s.phone}</p>
//                         <p><strong>Total Capacity:</strong> {s.totalCapacity}</p>
//                         <p><strong>Current Occupancy:</strong> {s.currentOccupancy}</p>
//                         <p><strong>Available Slots:</strong> {availableSlots}</p>
//                         <p><strong>Volunteers Needed:</strong> {s.volunteersNeeded}</p>
//                         <p><strong>Items Needed:</strong> {s.itemsNeeded.join(", ") || "None"}</p>

//                         {user?.role === "admin" && (
//                           <div style={{ marginTop: "10px" }}>
//                             <button onClick={() => handleEdit(s)} style={{ marginRight: "10px" }}>Edit</button>
//                             <button onClick={() => handleDelete(s._id)}>Delete</button>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShelterDashboard;



import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/shelterDashboard.css';
const ShelterSearch = () => {
  const [shelters, setShelters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch shelters from backend
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shelters");
        setShelters(res.data);
      } catch (err) {
        console.error("Error fetching shelters:", err);
      }
    };
    fetchShelters();
  }, []);

  // Filter shelters by name or location safely
  const filteredShelters = shelters.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.location && s.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
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
            <li key={s._id} style={{ marginBottom: "15px" }}>
              <strong>{s.name}</strong><br />
              Location: {s.location || "Unknown"}<br />
              Phone: {s.phone}<br />
              Total Capacity: {s.totalCapacity}<br />
              Current Occupancy: {s.currentOccupancy}<br />
              Available Slots: {s.totalCapacity - s.currentOccupancy}<br />
              Volunteers Needed: {s.volunteersNeeded}<br />
              Items Needed: {s.itemsNeeded.length > 0 ? s.itemsNeeded.join(", ") : "None"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};




export default ShelterSearch;
