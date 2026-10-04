// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ResourcePage from "./ResourcePage"; 
// import "../styles/adminDashboard.css";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [fundDonations, setFundDonations] = useState([]);
//   const [materialDonations, setMaterialDonations] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [shelters, setShelters] = useState([]);
//   const [news, setNews] = useState([]);
//   const [weather, setWeather] = useState(null);

//   const [newFundDonation, setNewFundDonation] = useState({ donorName: "", amount: "", type: "" });
//   const [newMaterialDonation, setNewMaterialDonation] = useState({ donorName: "", phone: "", items: "", collectionPlace: "" });
//   const [newRequest, setNewRequest] = useState({ email: "", needType: "", phone: "" });
//   const [newShelter, setNewShelter] = useState({ name: "", date: "", phone: "", totalCapacity: "", currentOccupancy: "", volunteersNeeded: "", itemsNeeded: "" });
//   const [newNews, setNewNews] = useState({ title: "", description: "", category: "", author: "Admin" });

//   const token = localStorage.getItem("adminToken");
//   const headers = { Authorization: `Bearer ${token}` };

//   // ---------------- Fetch All Data ----------------
//   const fetchAllData = async () => {
//     try {
//       const [u, fD, mD, reqs, sh, nw] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/users", { headers }),
//         axios.get("http://localhost:5000/api/admin/fund-donations", { headers }),
//         axios.get("http://localhost:5000/api/admin/material-donations", { headers }),
//         axios.get("http://localhost:5000/api/admin/requests", { headers }),
//         axios.get("http://localhost:5000/api/admin/shelters", { headers }),
//         axios.get("http://localhost:5000/api/admin/news", { headers })
//       ]);

//       setUsers(u.data.users || []);
//       setFundDonations(fD.data || []);
//       setMaterialDonations(mD.data || []);
//       setRequests(reqs.data || []);
//       setShelters(sh.data || []);
//       setNews(nw.data || []);
//     } catch (err) { console.error(err.response?.data || err.message); }
//   };

//   // ---------------- Fetch Weather (manual, input দিয়ে) ----------------
//   const fetchWeather = async (city = "Dhaka") => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
//       setWeather(res.data);
//     } catch (err) {
//       console.error("Weather fetch failed:", err.response?.data?.message || err.message);
//       setWeather({ error: err.response?.data?.message || err.message });
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   // ---------------- Generic CRUD ----------------
//   const deleteItem = async (url, setter, id) => {
//     try { 
//       await axios.delete(url, { headers }); 
//       setter(prev => prev.filter(item => item._id !== id)); 
//     } catch (err) { console.error(err); }
//   };

//   const addItem = async (url, data, resetFn) => {
//     try { 
//       await axios.post(url, data, { headers }); 
//       resetFn(); 
//       fetchAllData(); 
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       {/* Users Section */}
//       <section>
//         <h2>Users</h2>
//         {users.length === 0 ? <p>No users found.</p> : (
//           <table className="table">
//             <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
//             <tbody>{users.map(u => (
//               <tr key={u._id}>
//                 <td>{u.name || u.username}</td>
//                 <td>{u.email || "N/A"}</td>
//                 <td>{u.role}</td>
//                 <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/users/${u._id}`, setUsers, u._id)}>Delete</button></td>
//               </tr>
//             ))}</tbody>
//           </table>
//         )}
//       </section>

//       {/* Resource Management */}
//       <section>
//         <ResourcePage user={{ role: "admin" }} token={token} />
//       </section>

//       {/* Fund Donations */}
//       <section>
//         <h2>Fund Donations</h2>
//         <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/fund-donations", newFundDonation, () => setNewFundDonation({ donorName: "", amount: "", type: "" })); }} className="add-form">
//           <input placeholder="Donor Name" value={newFundDonation.donorName} onChange={e => setNewFundDonation({...newFundDonation, donorName: e.target.value})} required />
//           <input placeholder="Amount" value={newFundDonation.amount} onChange={e => setNewFundDonation({...newFundDonation, amount: e.target.value})} />
//           <input placeholder="Type" value={newFundDonation.type} onChange={e => setNewFundDonation({...newFundDonation, type: e.target.value})} />
//           <button type="submit">Add Fund Donation</button>
//         </form>
//         <table className="table">
//           <thead><tr><th>Donor</th><th>Amount</th><th>Type</th><th>Action</th></tr></thead>
//           <tbody>{fundDonations.map(d => (
//             <tr key={d._id}>
//               <td>{d.donorName}</td>
//               <td>{d.amount}</td>
//               <td>{d.type}</td>
//               <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/fund-donations/${d._id}`, setFundDonations, d._id)}>Delete</button></td>
//             </tr>
//           ))}</tbody>
//         </table>
//       </section>

//       {/* Material Donations */}
//       <section>
//         <h2>Material Donations</h2>
//         <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/material-donations", {...newMaterialDonation, items: newMaterialDonation.items.split(",").map(i=>i.trim())}, () => setNewMaterialDonation({ donorName: "", phone: "", items: "", collectionPlace: "" })); }} className="add-form">
//           <input placeholder="Donor Name" value={newMaterialDonation.donorName} onChange={e => setNewMaterialDonation({...newMaterialDonation, donorName: e.target.value})} required />
//           <input placeholder="Phone" value={newMaterialDonation.phone} onChange={e => setNewMaterialDonation({...newMaterialDonation, phone: e.target.value})} required />
//           <input placeholder="Items (comma separated)" value={newMaterialDonation.items} onChange={e => setNewMaterialDonation({...newMaterialDonation, items: e.target.value})} required />
//           <input placeholder="Collection Place" value={newMaterialDonation.collectionPlace} onChange={e => setNewMaterialDonation({...newMaterialDonation, collectionPlace: e.target.value})} required />
//           <button type="submit">Add Material Donation</button>
//         </form>
//         <table className="table">
//           <thead><tr><th>Donor</th><th>Phone</th><th>Items</th><th>Collection Place</th><th>Action</th></tr></thead>
//           <tbody>{materialDonations.map(d => (
//             <tr key={d._id}>
//               <td>{d.donorName}</td>
//               <td>{d.phone}</td>
//               <td>{d.items.join(", ")}</td>
//               <td>{d.collectionPlace}</td>
//               <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/material-donations/${d._id}`, setMaterialDonations, d._id)}>Delete</button></td>
//             </tr>
//           ))}</tbody>
//         </table>
//       </section>

//       {/* Help Requests */}
//       <section>
//         <h2>Help Requests</h2>
//         <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/requests", newRequest, () => setNewRequest({ email: "", needType: "", phone: "" })); }} className="add-form">
//           <input placeholder="Email" value={newRequest.email} onChange={e => setNewRequest({...newRequest, email: e.target.value})} required />
//           <input placeholder="Need Type" value={newRequest.needType} onChange={e => setNewRequest({...newRequest, needType: e.target.value})} required />
//           <input placeholder="Phone" value={newRequest.phone} onChange={e => setNewRequest({...newRequest, phone: e.target.value})} required />
//           <button type="submit">Add Request</button>
//         </form>
//         <table className="table">
//           <thead><tr><th>Email</th><th>Need Type</th><th>Phone</th><th>Action</th></tr></thead>
//           <tbody>{requests.map(r => (
//             <tr key={r._id}>
//               <td>{r.email || "N/A"}</td>
//               <td>{r.needType}</td>
//               <td>{r.phone}</td>
//               <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/requests/${r._id}`, setRequests, r._id)}>Delete</button></td>
//             </tr>
//           ))}</tbody>
//         </table>
//       </section>

//       {/* Shelters */}
//       <section>
//               <h2>Shelters</h2>
//               <form
//                 onSubmit={e => {
//                   e.preventDefault();
//                   addItem(
//                     "http://localhost:5000/api/admin/shelters",
//                     {
//                       ...newShelter,
//                       totalCapacity: parseInt(newShelter.totalCapacity),
//                       currentOccupancy: parseInt(newShelter.currentOccupancy),
//                       volunteersNeeded: parseInt(newShelter.volunteersNeeded),
//                       itemsNeeded: newShelter.itemsNeeded.split(",").map(i => i.trim())
//                     },
//                     () =>
//                       setNewShelter({
//                         name: "",
//                         location: "", // <-- add location here
//                         date: "",
//                         phone: "",
//                         totalCapacity: "",
//                         currentOccupancy: "",
//                         volunteersNeeded: "",
//                         itemsNeeded: ""
//                       })
//                   );
//                 }}
//                 className="add-form"
//               >
//                 <input
//                   placeholder="Name"
//                   value={newShelter.name}
//                   onChange={e => setNewShelter({ ...newShelter, name: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Location"
//                   value={newShelter.location}
//                   onChange={e => setNewShelter({ ...newShelter, location: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Date"
//                   value={newShelter.date}
//                   onChange={e => setNewShelter({ ...newShelter, date: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Phone"
//                   value={newShelter.phone}
//                   onChange={e => setNewShelter({ ...newShelter, phone: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Total Capacity"
//                   type="number"
//                   value={newShelter.totalCapacity}
//                   onChange={e => setNewShelter({ ...newShelter, totalCapacity: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Current Occupancy"
//                   type="number"
//                   value={newShelter.currentOccupancy}
//                   onChange={e => setNewShelter({ ...newShelter, currentOccupancy: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Volunteers Needed"
//                   type="number"
//                   value={newShelter.volunteersNeeded}
//                   onChange={e => setNewShelter({ ...newShelter, volunteersNeeded: e.target.value })}
//                   required
//                 />
//                 <input
//                   placeholder="Items Needed (comma separated)"
//                   value={newShelter.itemsNeeded}
//                   onChange={e => setNewShelter({ ...newShelter, itemsNeeded: e.target.value })}
//                 />
//                 <button type="submit">Add Shelter</button>
//               </form>

//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Location</th> {/* <-- add column header */}
//                     <th>Date</th>
//                     <th>Phone</th>
//                     <th>Capacity</th>
//                     <th>Occupancy</th>
//                     <th>Volunteers</th>
//                     <th>Items</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {shelters.map(s => (
//                     <tr key={s._id}>
//                       <td>{s.name}</td>
//                       <td>{s.location || "Unknown"}</td> {/* <-- add location display */}
//                       <td>{s.date}</td>
//                       <td>{s.phone}</td>
//                       <td>{s.totalCapacity}</td>
//                       <td>{s.currentOccupancy}</td>
//                       <td>{s.volunteersNeeded}</td>
//                       <td>{s.itemsNeeded.join(", ")}</td>
//                       <td>
//                         <button
//                           className="btn-delete"
//                           onClick={() =>
//                             deleteItem(
//                               `http://localhost:5000/api/admin/shelters/${s._id}`,
//                               setShelters,
//                               s._id
//                             )
//                           }
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//       </section>


//       {/* Weather */}
//             {/* Weather */}
//       {/* <section>
//         <h2>Weather</h2>
//         <div>
//           <input
//             type="text"
//             placeholder="Enter city"
//             value={weather?.cityInput || ""}
//             onChange={e =>
//               setWeather(prev => ({ ...prev, cityInput: e.target.value }))
//             }
//           />
//           <button
//             onClick={() => fetchWeather(weather?.cityInput || "Dhaka")}
//           >
//             Get Weather
//           </button>
//         </div>

//         {weather === null && <p>No weather data yet.</p>}

//         {weather && weather.error && (
//           <p style={{ color: "red" }}>
//             Weather fetch failed: {weather.error}
//           </p>
//         )}

//         {weather && !weather.error && (
//           <div className="weather-box">
//             <p><strong>City:</strong> {weather.location}</p>
//             <p><strong>Temperature:</strong> {weather.temperature}°C</p>
//             <p><strong>Condition:</strong> {weather.condition}</p>
//             <p><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
//             <p><strong>Rain Forecast:</strong> {weather.rainForecast} mm</p>
//             <p><strong>Alert:</strong> {weather.alert}</p>
//           </div>
//         )}
//       </section> */}


//       {/* News */}
//       {/* News */}
//       <section>
//         <h2>News</h2>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Author</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {news.map(n => (
//               <tr key={n._id}>
//                 <td>{n.title}</td>
//                 <td>{n.description}</td>
//                 <td>{n.category}</td>
//                 <td>{n.author}</td>
//                 <td>
//                   <button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/news/${n._id}`, setNews, n._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useEffect, useState } from "react";
import axios from "axios";
import ResourcePage from "./ResourcePage"; 
import CommunityUpdates from "../views/CommunityUpdates";
import CommunityChat from "../views/CommunityChat";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [fundDonations, setFundDonations] = useState([]);
  const [materialDonations, setMaterialDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [shelters, setShelters] = useState([]);
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);

  const [newFundDonation, setNewFundDonation] = useState({ donorName: "", amount: "", type: "" });
  const [newMaterialDonation, setNewMaterialDonation] = useState({ donorName: "", phone: "", items: "", collectionPlace: "" });
  const [newRequest, setNewRequest] = useState({ email: "", needType: "", phone: "" });
  const [newShelter, setNewShelter] = useState({ name: "", location: "", date: "", phone: "", totalCapacity: "", currentOccupancy: "", volunteersNeeded: "", itemsNeeded: "" });
  const [newNews, setNewNews] = useState({ title: "", description: "", category: "", author: "Admin" });

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  // ---------------- Fetch All Data ----------------
  const fetchAllData = async () => {
    try {
      const [u, fD, mD, reqs, sh, nw] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", { headers }),
        axios.get("http://localhost:5000/api/admin/fund-donations", { headers }),
        axios.get("http://localhost:5000/api/admin/material-donations", { headers }),
        axios.get("http://localhost:5000/api/admin/requests", { headers }),
        axios.get("http://localhost:5000/api/admin/shelters", { headers }),
        axios.get("http://localhost:5000/api/admin/news", { headers })
      ]);

      setUsers(u.data.users || []);
      setFundDonations(fD.data || []);
      setMaterialDonations(mD.data || []);
      setRequests(reqs.data || []);
      setShelters(sh.data || []);
      setNews(nw.data || []);
    } catch (err) { console.error(err.response?.data || err.message); }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ---------------- Generic CRUD ----------------
  const deleteItem = async (url, setter, id) => {
    try { 
      await axios.delete(url, { headers }); 
      setter(prev => prev.filter(item => item._id !== id)); 
    } catch (err) { console.error(err); }
  };

  const addItem = async (url, data, resetFn) => {
    try { 
      await axios.post(url, data, { headers }); 
      resetFn(); 
      fetchAllData(); 
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Users Section */}
      <section>
        <h2>Users</h2>
        {users.length === 0 ? <p>No users found.</p> : (
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
            <tbody>{users.map(u => (
              <tr key={u._id}>
                <td>{u.name || u.username}</td>
                <td>{u.email || "N/A"}</td>
                <td>{u.role}</td>
                <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/users/${u._id}`, setUsers, u._id)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </section>

      {/* Resource Management */}
      <section>
        <ResourcePage user={{ role: "admin" }} token={token} />
      </section>

      {/* Fund Donations */}
      <section>
        <h2>Fund Donations</h2>
        <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/fund-donations", newFundDonation, () => setNewFundDonation({ donorName: "", amount: "", type: "" })); }} className="add-form">
          <input placeholder="Donor Name" value={newFundDonation.donorName} onChange={e => setNewFundDonation({...newFundDonation, donorName: e.target.value})} required />
          <input placeholder="Amount" value={newFundDonation.amount} onChange={e => setNewFundDonation({...newFundDonation, amount: e.target.value})} />
          <input placeholder="Type" value={newFundDonation.type} onChange={e => setNewFundDonation({...newFundDonation, type: e.target.value})} />
          <button type="submit">Add Fund Donation</button>
        </form>
        <table className="table">
          <thead><tr><th>Donor</th><th>Amount</th><th>Type</th><th>Action</th></tr></thead>
          <tbody>{fundDonations.map(d => (
            <tr key={d._id}>
              <td>{d.donorName}</td>
              <td>{d.amount}</td>
              <td>{d.type}</td>
              <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/fund-donations/${d._id}`, setFundDonations, d._id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      {/* Material Donations */}
      <section>
        <h2>Material Donations</h2>
        <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/material-donations", {...newMaterialDonation, items: newMaterialDonation.items.split(",").map(i=>i.trim())}, () => setNewMaterialDonation({ donorName: "", phone: "", items: "", collectionPlace: "" })); }} className="add-form">
          <input placeholder="Donor Name" value={newMaterialDonation.donorName} onChange={e => setNewMaterialDonation({...newMaterialDonation, donorName: e.target.value})} required />
          <input placeholder="Phone" value={newMaterialDonation.phone} onChange={e => setNewMaterialDonation({...newMaterialDonation, phone: e.target.value})} required />
          <input placeholder="Items (comma separated)" value={newMaterialDonation.items} onChange={e => setNewMaterialDonation({...newMaterialDonation, items: e.target.value})} required />
          <input placeholder="Collection Place" value={newMaterialDonation.collectionPlace} onChange={e => setNewMaterialDonation({...newMaterialDonation, collectionPlace: e.target.value})} required />
          <button type="submit">Add Material Donation</button>
        </form>
        <table className="table">
          <thead><tr><th>Donor</th><th>Phone</th><th>Items</th><th>Collection Place</th><th>Action</th></tr></thead>
          <tbody>{materialDonations.map(d => (
            <tr key={d._id}>
              <td>{d.donorName}</td>
              <td>{d.phone}</td>
              <td>{d.items.join(", ")}</td>
              <td>{d.collectionPlace}</td>
              <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/material-donations/${d._id}`, setMaterialDonations, d._id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      {/* Help Requests */}
      <section>
        <h2>Help Requests</h2>
        <form onSubmit={e => { e.preventDefault(); addItem("http://localhost:5000/api/admin/requests", newRequest, () => setNewRequest({ email: "", needType: "", phone: "" })); }} className="add-form">
          <input placeholder="Email" value={newRequest.email} onChange={e => setNewRequest({...newRequest, email: e.target.value})} required />
          <input placeholder="Need Type" value={newRequest.needType} onChange={e => setNewRequest({...newRequest, needType: e.target.value})} required />
          <input placeholder="Phone" value={newRequest.phone} onChange={e => setNewRequest({...newRequest, phone: e.target.value})} required />
          <button type="submit">Add Request</button>
        </form>
        <table className="table">
          <thead><tr><th>Email</th><th>Need Type</th><th>Phone</th><th>Action</th></tr></thead>
          <tbody>{requests.map(r => (
            <tr key={r._id}>
              <td>{r.email || "N/A"}</td>
              <td>{r.needType}</td>
              <td>{r.phone}</td>
              <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/requests/${r._id}`, setRequests, r._id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      {/* Shelters */}
      <section>
        <h2>Shelters</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            addItem(
              "http://localhost:5000/api/admin/shelters",
              {
                ...newShelter,
                totalCapacity: parseInt(newShelter.totalCapacity),
                currentOccupancy: parseInt(newShelter.currentOccupancy),
                volunteersNeeded: parseInt(newShelter.volunteersNeeded),
                itemsNeeded: newShelter.itemsNeeded.split(",").map(i => i.trim())
              },
              () =>
                setNewShelter({
                  name: "",
                  location: "",
                  date: "",
                  phone: "",
                  totalCapacity: "",
                  currentOccupancy: "",
                  volunteersNeeded: "",
                  itemsNeeded: ""
                })
            );
          }}
          className="add-form"
        >
          <input placeholder="Name" value={newShelter.name} onChange={e => setNewShelter({ ...newShelter, name: e.target.value })} required />
          <input placeholder="Location" value={newShelter.location} onChange={e => setNewShelter({ ...newShelter, location: e.target.value })} required />
          <input placeholder="Date" value={newShelter.date} onChange={e => setNewShelter({ ...newShelter, date: e.target.value })} required />
          <input placeholder="Phone" value={newShelter.phone} onChange={e => setNewShelter({ ...newShelter, phone: e.target.value })} required />
          <input placeholder="Total Capacity" type="number" value={newShelter.totalCapacity} onChange={e => setNewShelter({ ...newShelter, totalCapacity: e.target.value })} required />
          <input placeholder="Current Occupancy" type="number" value={newShelter.currentOccupancy} onChange={e => setNewShelter({ ...newShelter, currentOccupancy: e.target.value })} required />
          <input placeholder="Volunteers Needed" type="number" value={newShelter.volunteersNeeded} onChange={e => setNewShelter({ ...newShelter, volunteersNeeded: e.target.value })} required />
          <input placeholder="Items Needed (comma separated)" value={newShelter.itemsNeeded} onChange={e => setNewShelter({ ...newShelter, itemsNeeded: e.target.value })} />
          <button type="submit">Add Shelter</button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Location</th><th>Date</th><th>Phone</th><th>Capacity</th><th>Occupancy</th><th>Volunteers</th><th>Items</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shelters.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.location || "Unknown"}</td>
                <td>{s.date}</td>
                <td>{s.phone}</td>
                <td>{s.totalCapacity}</td>
                <td>{s.currentOccupancy}</td>
                <td>{s.volunteersNeeded}</td>
                <td>{s.itemsNeeded.join(", ")}</td>
                <td><button className="btn-delete" onClick={() => deleteItem(`http://localhost:5000/api/admin/shelters/${s._id}`, setShelters, s._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Community Updates Admin Control */}
      <section>
        <h2>Community Updates</h2>
        <CommunityUpdates 
          user={{ email: "admin@example.com", token: token, role: "admin" }}
          isAdmin={true} 
        />
      </section>

      {/* Chat */}
      <section>
        <h2>Community Chat</h2>
        <CommunityChat
          userName="Admin"
          userEmail="admin@example.com"
          userPhone="N/A"
          userLocation="Admin Office"
          userRole="Admin"
        />
      </section>

    </div>
  );
};

export default AdminDashboard;
