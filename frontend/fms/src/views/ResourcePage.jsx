import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/resourcePage.css";

const ResourcePage = ({ user, token }) => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: "", type: "", totalQuantity: 0, sentQuantity: 0, sentTo: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => { fetchResources(); }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resources");
      setResources(res.data.resources || []);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") {
      setMessage("Only admin can add resources.");
      return;
    }

    try {
      const payload = {
        ...formData,
        totalQuantity: parseInt(formData.totalQuantity) || 0,
        sentQuantity: parseInt(formData.sentQuantity) || 0
      };

      const res = await axios.post("http://localhost:5000/api/resources", payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Resource added successfully.");
      setFormData({ name: "", type: "", totalQuantity: 0, sentQuantity: 0, sentTo: "" });
      fetchResources();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error adding resource");
    }
  };

  const handleDelete = async (id) => {
    if (!user || user.role !== "admin") {
      setMessage("Only admin can delete resources.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchResources();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error deleting resource");
    }
  };

  return (
    <div className="resource-container">
      <h2>Resource Management</h2>

      {user?.role === "admin" && (
        <form className="resource-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Resource Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
          <input type="text" placeholder="Type" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
          <input type="number" placeholder="Total Quantity" value={formData.totalQuantity} onChange={e => setFormData({ ...formData, totalQuantity: e.target.value })} required />
          <input type="number" placeholder="Sent Quantity" value={formData.sentQuantity} onChange={e => setFormData({ ...formData, sentQuantity: e.target.value })} />
          <input type="text" placeholder="Sent To" value={formData.sentTo} onChange={e => setFormData({ ...formData, sentTo: e.target.value })} />
          <button type="submit">Add Resource</button>
        </form>
      )}

      {message && <p className="message">{message}</p>}

      <h3>Available Resources</h3>
      <table className="resource-table">
        <thead>
          <tr>
            <th>Name</th><th>Type</th><th>Total</th><th>Sent</th><th>Remaining</th><th>Sent To</th>
            {user?.role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {resources.map(r => {
            const total = parseInt(r.totalQuantity) || 0;
            const sent = parseInt(r.sentQuantity) || 0;
            return (
              <tr key={r._id}>
                <td>{r.name}</td><td>{r.type}</td><td>{total}</td><td>{sent}</td>
                <td>{total - sent}</td><td>{r.sentTo || "N/A"}</td>
                {user?.role === "admin" && (
                  <td><button onClick={() => handleDelete(r._id)}>Delete</button></td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResourcePage;
