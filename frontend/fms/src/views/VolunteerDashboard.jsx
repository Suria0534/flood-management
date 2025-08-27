// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Modal from "react-modal";
// import axios from "axios";
// import "../styles/volunteersdashboard.css";

// // Fund and Material Donation Forms (Components)
// // import DonateFundsForm from "./DonateFundsForm";  // Fund Donation Form
// // import DonateMaterialsForm from "./DonateMaterialsForm"; // Material Donation Form

// const VolunteerDashboard = () => {
//     const location = useLocation();
//     const email = location.state?.email || "No email provided";

//     const [tasks, setTasks] = useState([]);
//     const [showDonationForm, setShowDonationForm] = useState(false);  // Toggle for showing donation form
//     const [donationType, setDonationType] = useState(''); // Track which type of donation is selected
//     // community update
//     const [modalOpen, setModalOpen] = useState(false);
//     const [updates, setUpdates] = useState([]);
//     const [text, setText] = useState("");
//     const [file, setFile] = useState(null);

//     useEffect(() => {
//         if (email !== "No email provided") {
//             axios
//                 .get(`http://localhost:5000/api/volunteer-tasks/${email}`)
//                 .then((res) => {
//                     setTasks(res.data);
//                 })
//                 .catch((err) => {
//                     console.error("Error fetching tasks:", err);
//                 });
//         }
//     }, [email]);

//     const handleDonateClick = (type) => {
//         setDonationType(type);  // Set the type of donation (funds/materials)
//         setShowDonationForm(true); // Show the donation form
//     };

//     const handleCloseDonationForm = () => {
//         setShowDonationForm(false); // Close the donation form
//         setDonationType(''); // Reset the donation type
//     };

//     return (
//         <div className="container-volundash" role="main">
//             <h1 className="title-volundash">Volunteer Dashboard</h1>
//             <p className="welcome-text-volundash">Welcome, {email}</p>

//             {/* Assigned Tasks */}
//             <h2 className="section-title-volundash">Your Assigned Tasks</h2>
//             {tasks.length === 0 ? (
//                 <p className="no-tasks-volundash">No tasks assigned yet.</p>
//             ) : (
//                 <ul className="task-list-volundash" aria-label="List of assigned tasks">
//                     {tasks.map((task) => (
//                         <li key={task._id} className="task-item-volundash" tabIndex={0}>
//                             <p className="task-field-volundash"><strong>Task:</strong> {task.task}</p>
//                             <p className="task-field-volundash"><strong>Assigned By:</strong> {task.assignedBy}</p>
//                             <p className="task-field-volundash"><strong>Date:</strong> {new Date(task.assignedAt).toLocaleString()}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* Donation Section */}
//             {/* <div className="donation-section-volundash" style={{ marginTop: '30px' }}>
//                 <h3>Make a Donation</h3>
//                 {/* Ensure buttons are visible */}
//                 {/* <button onClick={() => handleDonateClick('funds')}>Donate Funds</button>
//                 <button onClick={() => handleDonateClick('materials')}>Donate Materials</button>
//             </div> */} */

//             {/* Donation Form Modal */}
//             {/* {showDonationForm && (
//                 <div className="donation-form-modal">
//                     <h3>{donationType === 'funds' ? 'Donate Funds' : 'Donate Materials'}</h3>
//                     <button onClick={handleCloseDonationForm}>Close</button>
//                     {donationType === 'funds' ? (
//                         <DonateFundsForm email={email} />
//                     ) : (
//                         <DonateMaterialsForm email={email} />
//                     )}
//                 </div>
//             )} */}
        
//         </div>
        
//     );
// };

// export default VolunteerDashboard;




// src/views/VolunteerDashboard.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "../styles/volunteersdashboard.css";

Modal.setAppElement("#root");

const VolunteerDashboard = () => {
    const location = useLocation();
    const email = location.state?.email || "No email provided";

    const [tasks, setTasks] = useState([]);
    const [showDonationForm, setShowDonationForm] = useState(false);  
    const [donationType, setDonationType] = useState('');

    // ------------------- Community Updates -------------------
    const [modalOpen, setModalOpen] = useState(false);
    const [updates, setUpdates] = useState([]);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    // ------------------- Donation History -------------------
    const [donationHistory, setDonationHistory] = useState([]);

    // Fetch assigned tasks
    useEffect(() => {
        if (email !== "No email provided") {
            axios
                .get(`http://localhost:5000/api/volunteer-tasks/${email}`)
                .then((res) => setTasks(res.data))
                .catch((err) => console.error("Error fetching tasks:", err));
        }
    }, [email]);

    // Fetch community updates
    useEffect(() => { fetchUpdates(); }, []);
    const fetchUpdates = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/updates");
            setUpdates(res.data.updates);
        } catch (err) {
            console.error("Error fetching updates", err);
        }
    };

    // Fetch donation history
    useEffect(() => {
        const fetchDonationHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/donations/${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDonationHistory(res.data);
            } catch (err) {
                console.error("Error fetching donation history", err);
            }
        };
        fetchDonationHistory();
    }, [email]);

    // Submit community update
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

            setText("");
            setFile(null);
            setModalOpen(false);
            fetchUpdates();
        } catch (err) {
            console.error("Error posting update", err);
        }
    };

    // Handle donation buttons
    const handleDonateClick = (type) => {
        setDonationType(type);
        setShowDonationForm(true);
    };
    const handleCloseDonationForm = () => {
        setShowDonationForm(false);
        setDonationType('');
    };

    return (
        <div className="container-volundash" role="main">
            <h1 className="title-volundash">Volunteer Dashboard</h1>
            <p className="welcome-text-volundash">Welcome, {email}</p>

            {/* Assigned Tasks */}
            <h2 className="section-title-volundash">Your Assigned Tasks</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks-volundash">No tasks assigned yet.</p>
            ) : (
                <ul className="task-list-volundash">
                    {tasks.map((task) => (
                        <li key={task._id} className="task-item-volundash">
                            <p><strong>Task:</strong> {task.task}</p>
                            <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                            <p><strong>Date:</strong> {new Date(task.assignedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Donation Section */}
            <div className="donation-section-volundash" style={{ marginTop: '30px' }}>
                <h3>Make a Donation</h3>
                <button onClick={() => handleDonateClick('funds')}>Donate Funds</button>
                <button onClick={() => handleDonateClick('materials')}>Donate Materials</button>

                {/* Donation History */}
                <div className="donation-history-box-volundash" style={{ marginTop: '20px' }}>
                    <h4>Your Donation History</h4>
                    {donationHistory.length === 0 ? (
                        <p>No donations found.</p>
                    ) : (
                        <ul>
                            {donationHistory.map((donation, idx) => (
                                <li key={idx}>
                                    {donation.type === 'fund' ?
                                        `Fund Donation: $${donation.amount} - ${new Date(donation.date).toLocaleDateString()}` :
                                        `Material Donation: ${donation.materialType} (Qty: ${donation.quantity}) - ${new Date(donation.date).toLocaleDateString()}`
                                    }
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Community Updates Section */}
            <div className="updates-section-volundash" style={{ marginTop: '30px' }}>
                <h3>Community Updates</h3>
                <button onClick={() => setModalOpen(true)}>Share Update</button>
                <div className="updates-feed">
                    {updates.map((u) => (
                        <div key={u._id} className="update-card">
                            <p><strong>{u.author}</strong>: {u.text}</p>
                            {u.media && (
                                u.media.endsWith(".mp4") ? (
                                    <video width="250" controls>
                                        <source src={`http://localhost:5000${u.media}`} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img src={`http://localhost:5000${u.media}`} width="250" alt="media" />
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for creating update */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Share Update"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Share Update</h2>
                <form onSubmit={handleSubmitUpdate}>
                    <textarea
                        placeholder="Write something..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files[0])} />
                    <button type="submit">Post</button>
                </form>
                <button onClick={() => setModalOpen(false)}>Close</button>
            </Modal>

        </div>
    );
};

export default VolunteerDashboard;
