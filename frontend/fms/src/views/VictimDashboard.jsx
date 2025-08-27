import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SOSButton from '../views/SOSButton';
import Modal from "react-modal";
import ShelterCard from '../views/ShelterCard';
import HelpRequest from '../views/HelpRequest'; // ✅ Import HelpRequest
import '../styles/victimdashboard.css';

Modal.setAppElement("#root");

function VictimDashboard() {
    const location = useLocation();
    const email = location.state?.email || 'No email provided';
    const phone = location.state?.phone || '+8801531982970';
    const [donationHistory, setDonationHistory] = useState([]);
    const [updates, setUpdates] = useState([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [shelters, setShelters] = useState([]);
    const [newShelter, setNewShelter] = useState({ name: "", location: "", capacity: 0 });

    const navigate = useNavigate();

    // Fetch Donation History
    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/donations/${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDonationHistory(res.data);
            } catch (err) { console.error(err); }
        };
        fetchDonationHistory();
    }, [email]);

    // Fetch Updates & Shelters
    useEffect(() => { fetchUpdates(); fetchShelters(); }, []);
    const fetchUpdates = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/updates");
            setUpdates(res.data.updates);
        } catch (err) { console.error(err); }
    };
    const fetchShelters = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/shelters");
            setShelters(res.data);
        } catch (err) { console.error(err); }
    };

    // Community Updates
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("author", email || "Anonymous");
            formData.append("text", text);
            if (file) formData.append("media", file);

            await axios.post("http://localhost:5000/api/updates", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setText(""); setFile(null); setModalOpen(false); fetchUpdates();
        } catch (err) { console.error(err); }
    };

    // Shelters
    const addShelter = async () => {
        if (!newShelter.name || !newShelter.location || newShelter.capacity <= 0) return;
        try {
            const res = await axios.post("http://localhost:5000/api/shelters", {
                ...newShelter, currentOccupancy: 0, needsHelp: false
            });
            setShelters([...shelters, res.data]);
            setNewShelter({ name: "", location: "", capacity: 0 });
        } catch (err) { console.error(err); }
    };
    const updateOccupancy = async (id, change) => {
        const shelter = shelters.find(s => s._id === id);
        try {
            const updated = await axios.put(`http://localhost:5000/api/shelters/${id}`, {
                currentOccupancy: shelter.currentOccupancy + change,
                needsHelp: shelter.currentOccupancy + change >= shelter.capacity,
            });
            setShelters(shelters.map(s => s._id === id ? updated.data : s));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container-victdash">
            <h2 className="title-victdash">Victim Dashboard</h2>
            <p className="welcome-text-victdash">Welcome, {email}</p>

            <div className="content-victdash">

                {/* ---------------- Help Request Component ---------------- */}
                <HelpRequest email={email} phone={phone} />

                {/* ---------------- SOS ---------------- */}
                <div className="sos-box-victdash">
                    <h3>Emergency SOS</h3>
                    <SOSButton phoneNumber={phone} />
                </div>

                {/* ---------------- Donations ---------------- */}
                <div className="donation-box-victdash">
                    <h3>Make a Donation</h3>
                    <button onClick={() => navigate('/donations/fund')}>Donate Funds</button>
                    <button onClick={() => navigate('/donations/material')}>Donate Materials</button>
                </div>

                {/* ---------------- Donation History ---------------- */}
                {/* <div className="donation-history-box-victdash">
                    <h3>Your Donation History</h3>
                    {donationHistory.length === 0 ? (<p>No donations found.</p>) :
                        (<ul>{donationHistory.map((d, idx) => (
                            <li key={idx}>
                                {d.type === 'fund' ? `Fund Donation: $${d.amount} - ${new Date(d.date).toLocaleDateString()}` :
                                    `Material Donation: ${d.materialType} (Qty: ${d.quantity}) - ${new Date(d.date).toLocaleDateString()}` }
                            </li>
                        ))}</ul>)
                    }
                </div> */}

                {/* ---------------- Shelters ---------------- */}
                <div className="shelter-section-victdash">
                    <h3>Nearest Shelters</h3>
                    <div className="add-shelter-box">
                        <input type="text" placeholder="Shelter Name" value={newShelter.name} onChange={e => setNewShelter({...newShelter, name: e.target.value})} />
                        <input type="text" placeholder="Location" value={newShelter.location} onChange={e => setNewShelter({...newShelter, location: e.target.value})} />
                        <input type="number" placeholder="Capacity" value={newShelter.capacity} onChange={e => setNewShelter({...newShelter, capacity: parseInt(e.target.value)})} />
                        <button onClick={addShelter}>Add Shelter</button>
                    </div>
                    {shelters.map(s => <ShelterCard key={s._id} shelter={s} onAdd={id => updateOccupancy(id, 1)} onRemove={id => updateOccupancy(id, -1)} />)}
                </div>

                {/* ---------------- Community Updates ---------------- */}
                <div className="updates-section-victdash">
                    <h3>Community Updates</h3>
                    <button onClick={() => setModalOpen(true)}>Share Update</button>
                    <div className="updates-feed">
                        {updates.map(u => (
                            <div key={u._id} className="update-card">
                                <p><strong>{u.author}</strong>: {u.text}</p>
                                {u.media && (u.media.endsWith(".mp4") ?
                                    <video width="250" controls><source src={`http://localhost:5000${u.media}`} type="video/mp4" /></video> :
                                    <img src={`http://localhost:5000${u.media}`} width="250" alt="media" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} className="modal" overlayClassName="overlay">
                <h2>Share Update</h2>
                <form onSubmit={handleSubmitUpdate}>
                    <textarea placeholder="Write something..." value={text} onChange={e => setText(e.target.value)} required />
                    <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files[0])} />
                    <button type="submit">Post</button>
                </form>
                <button onClick={() => setModalOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default VictimDashboard;
