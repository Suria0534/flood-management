import React, { useState } from "react";
import axios from "axios";

const HelpRequest = ({ email, phone }) => {
  const [form, setForm] = useState({ needs: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitRequest = async () => {
    if (!form.needs || !form.description) {
      alert("Please fill in all fields");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const payload = {
          email,
          phone,
          needType: form.needs,
          description: form.description,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        try {
          const res = await axios.post(
            "http://localhost:5000/api/help-request/request",
            payload
          );
          alert(res.data.message || "Help request submitted successfully");
          setForm({ needs: "", description: "" });
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Failed to submit request");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Location access is required");
        setLoading(false);
      }
    );
  };

  return (
    <div className="form-box-victdash">
      <h3>Post a Help Request</h3>
      <label>Need Type:</label>
      <select name="needs" value={form.needs} onChange={handleChange} required>
        <option value="">--Select--</option>
        <option value="Food">Food</option>
        <option value="Shelter">Shelter</option>
        <option value="Medical Aid">Medical Aid</option>
        <option value="Clothing">Clothing</option>
      </select>

      <label>Description:</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        required
      />

      <button onClick={submitRequest} disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </div>
  );
};

export default HelpRequest;
