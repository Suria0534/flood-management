import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/volunteersdashboard.css";

const VolunteerDashboard = () => {
    const location = useLocation();
    const email = location.state?.email || "No email provided";

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (email !== "No email provided") {
            axios
                .get(`http://localhost:5000/api/volunteer-tasks/${email}`)
                .then((res) => {
                    setTasks(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching tasks:", err);
                });
        }
    }, [email]);

    return (
        <div className="container-volundash" role="main">
            <h1 className="title-volundash">Volunteer Dashboard</h1>
            <p className="welcome-text-volundash">Welcome, {email}</p>

            <h2 className="section-title-volundash">Your Assigned Tasks</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks-volundash">No tasks assigned yet.</p>
            ) : (
                <ul className="task-list-volundash" aria-label="List of assigned tasks">
                    {tasks.map((task) => (
                        <li key={task._id} className="task-item-volundash" tabIndex={0}>
                            <p className="task-field-volundash"><strong>Task:</strong> {task.task}</p>
                            <p className="task-field-volundash"><strong>Assigned By:</strong> {task.assignedBy}</p>
                            <p className="task-field-volundash"><strong>Date:</strong> {new Date(task.assignedAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VolunteerDashboard;
