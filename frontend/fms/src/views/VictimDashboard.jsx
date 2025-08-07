import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/victimdashboard.css';

function VictimDashboard() {
    const location = useLocation();
    const email = location.state?.email || 'No email provided';

    const [requestData, setRequestData] = useState({
        needType: '',
        description: '',
    });

    const handleChange = (e) => {
        setRequestData({ ...requestData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/victim/need', {
                email,
                ...requestData,
            });
            alert('Help request posted successfully!');
            setRequestData({ needType: '', description: '' });
        } catch (err) {
            alert('Failed to post help request');
        }
    };

    return (
        <div className="container-victdash">
            <h2 className="title-victdash">Victim Dashboard</h2>
            <p className="welcome-text-victdash">Welcome, {email}</p>

            <div className="content-victdash">
                <div className="form-box-victdash">
                    <h3>Post a Help Request</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="needType">Need Type:</label>
                        <select
                            id="needType"
                            name="needType"
                            value={requestData.needType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">--Select--</option>
                            <option value="Food">Food</option>
                            <option value="Shelter">Shelter</option>
                            <option value="Medical Aid">Medical Aid</option>
                            <option value="Clothing">Clothing</option>
                        </select>

                        <label htmlFor="description-victdash" style={{ marginTop: '15px' }}>
                            Description:
                        </label>
                        <textarea
                            id="description-victdash"
                            name="description"
                            value={requestData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                        />

                        <button type="submit">Submit Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VictimDashboard;
