// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ResourcePage from "./ResourcePage"; // ResourcePage import
// import "../styles/adminDashboard.css";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [donations, setDonations] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [newDonation, setNewDonation] = useState({ donorName: "", amount: "", item: "", type: "" });
//   const [newRequest, setNewRequest] = useState({ email: "", needType: "", phone: "" });

//   const token = localStorage.getItem("adminToken");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const [u, d, reqs] = await Promise.all([
//         axios.get("http://localhost:5000/api/admin/users", { headers }),
//         axios.get("http://localhost:5000/api/admin/donations", { headers }),
//         axios.get("http://localhost:5000/api/admin/requests", { headers }),
//       ]);

//       const uniqueUsers = Array.from(
//         new Map((u.data.users || []).map(item => [item._id, item])).values()
//       );

//       setUsers(uniqueUsers);
//       setDonations(d.data.donations || []);
//       setRequests(reqs.data.requests || []);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   // ----- CRUD Functions -----
//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers });
//       setUsers(users.filter(u => u._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteDonation = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/donations/${id}`, { headers });
//       fetchAllData();
//     } catch (err) { console.error(err); }
//   };

//   const deleteRequest = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/requests/${id}`, { headers });
//       fetchAllData();
//     } catch (err) { console.error(err); }
//   };

//   // ----- Add Functions -----
//   const addDonation = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/admin/donations", newDonation, { headers });
//       setNewDonation({ donorName: "", amount: "", item: "", type: "" });
//       fetchAllData();
//     } catch (err) { console.error(err); }
//   };

//   const addRequest = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/admin/requests", newRequest, { headers });
//       setNewRequest({ email: "", needType: "", phone: "" });
//       fetchAllData();
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       {/* Users */}
//       <section>
//         <h2>Users</h2>
//         {users.length === 0 ? <p>No users found.</p> : (
//           <table className="table">
//             <thead>
//               <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
//             </thead>
//             <tbody>
//               {users.map(u => (
//                 <tr key={u._id}>
//                   <td>{u.name || u.username}</td>
//                   <td>{u.email || "N/A"}</td>
//                   <td>{u.role}</td>
//                   <td><button className="btn-delete" onClick={() => deleteUser(u._id)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>

//       {/* Resource Management */}
//       <section>
//         <ResourcePage user={{ role: "admin" }} token={token} />
//       </section>

//       {/* Donations */}
//       <section>
//         <h2>Donations</h2>
//         <form onSubmit={addDonation} className="add-form">
//           <input placeholder="Donor Name" value={newDonation.donorName} onChange={e => setNewDonation({...newDonation, donorName: e.target.value})} required />
//           <input placeholder="Amount" value={newDonation.amount} onChange={e => setNewDonation({...newDonation, amount: e.target.value})} />
//           <input placeholder="Item" value={newDonation.item} onChange={e => setNewDonation({...newDonation, item: e.target.value})} />
//           <input placeholder="Type" value={newDonation.type} onChange={e => setNewDonation({...newDonation, type: e.target.value})} />
//           <button type="submit">Add Donation</button>
//         </form>
//         <table className="table">
//           <thead><tr><th>Donor</th><th>Amount/Item</th><th>Type</th><th>Action</th></tr></thead>
//           <tbody>
//             {donations.map(d => (
//               <tr key={d._id}>
//                 <td>{d.donorName}</td>
//                 <td>{d.amount || d.item}</td>
//                 <td>{d.type}</td>
//                 <td><button className="btn-delete" onClick={() => deleteDonation(d._id)}>Delete</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Help Requests */}
//       <section>
//         <h2>Help Requests</h2>
//         <form onSubmit={addRequest} className="add-form">
//           <input placeholder="Email" value={newRequest.email} onChange={e => setNewRequest({...newRequest, email: e.target.value})} required />
//           <input placeholder="Need Type" value={newRequest.needType} onChange={e => setNewRequest({...newRequest, needType: e.target.value})} required />
//           <input placeholder="Phone" value={newRequest.phone} onChange={e => setNewRequest({...newRequest, phone: e.target.value})} required />
//           <button type="submit">Add Request</button>
//         </form>
//         <table className="table">
//           <thead>
//             <tr><th>Email</th><th>Need Type</th><th>Phone</th><th>Action</th></tr>
//           </thead>
//           <tbody>
//             {requests.map(r => (
//               <tr key={r._id}>
//                 <td>{r.email || "N/A"}</td>
//                 <td>{r.needType}</td>
//                 <td>{r.phone}</td>
//                 <td><button className="btn-delete" onClick={() => deleteRequest(r._id)}>Delete</button></td>
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
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newDonation, setNewDonation] = useState({ donorName: "", amount: "", item: "", type: "" });
  const [newRequest, setNewRequest] = useState({ email: "", needType: "", phone: "" });

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    try {
      const [u, d, reqs] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/users", { headers }),
        axios.get("http://localhost:5000/api/admin/donations", { headers }),
        axios.get("http://localhost:5000/api/admin/requests", { headers }),
      ]);
      const uniqueUsers = Array.from(
        new Map((u.data.users || []).map(item => [item._id, item])).values()
      );
      setUsers(uniqueUsers);
      setDonations(d.data.donations || []);
      setRequests(reqs.data.requests || []);
    } catch (err) { console.error(err.response?.data || err.message); }
  };

  // ----- CRUD Functions -----
  const deleteUser = async (id) => {
    try { await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers }); setUsers(users.filter(u => u._id !== id)); }
    catch (err) { console.error(err); }
  };

  const deleteDonation = async (id) => {
    try { await axios.delete(`http://localhost:5000/api/admin/donations/${id}`, { headers }); fetchAllData(); }
    catch (err) { console.error(err); }
  };

  const deleteRequest = async (id) => {
    try { await axios.delete(`http://localhost:5000/api/admin/requests/${id}`, { headers }); fetchAllData(); }
    catch (err) { console.error(err); }
  };

  // ----- Add Functions -----
  const addDonation = async (e) => {
    e.preventDefault();
    try { await axios.post("http://localhost:5000/api/admin/donations", newDonation, { headers }); setNewDonation({ donorName: "", amount: "", item: "", type: "" }); fetchAllData(); }
    catch (err) { console.error(err); }
  };

  const addRequest = async (e) => {
    e.preventDefault();
    try { await axios.post("http://localhost:5000/api/admin/requests", newRequest, { headers }); setNewRequest({ email: "", needType: "", phone: "" }); fetchAllData(); }
    catch (err) { console.error(err); }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Users */}
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
                <td><button className="btn-delete" onClick={() => deleteUser(u._id)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </section>

      {/* Resource Management */}
      <section>
        <ResourcePage user={{ role: "admin" }} token={token} />
      </section>

      {/* Donations */}
      <section>
        <h2>Donations</h2>
        <form onSubmit={addDonation} className="add-form">
          <input placeholder="Donor Name" value={newDonation.donorName} onChange={e => setNewDonation({...newDonation, donorName: e.target.value})} required />
          <input placeholder="Amount" value={newDonation.amount} onChange={e => setNewDonation({...newDonation, amount: e.target.value})} />
          <input placeholder="Item" value={newDonation.item} onChange={e => setNewDonation({...newDonation, item: e.target.value})} />
          <input placeholder="Type" value={newDonation.type} onChange={e => setNewDonation({...newDonation, type: e.target.value})} />
          <button type="submit">Add Donation</button>
        </form>
        <table className="table">
          <thead><tr><th>Donor</th><th>Amount/Item</th><th>Type</th><th>Action</th></tr></thead>
          <tbody>{donations.map(d => (
            <tr key={d._id}>
              <td>{d.donorName}</td>
              <td>{d.amount || d.item}</td>
              <td>{d.type}</td>
              <td><button className="btn-delete" onClick={() => deleteDonation(d._id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>

      {/* Help Requests */}
      <section>
        <h2>Help Requests</h2>
        <form onSubmit={addRequest} className="add-form">
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
              <td><button className="btn-delete" onClick={() => deleteRequest(r._id)}>Delete</button></td>
            </tr>
          ))}</tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
