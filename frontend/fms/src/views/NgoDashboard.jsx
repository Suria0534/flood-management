import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/ngodashboard.css";

function NGODashboard() {
    const location = useLocation();
    const ngoEmail = location.state?.email || "No email provided";

    const [volunteers, setVolunteers] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState("");
    const [selectedTask, setSelectedTask] = useState("");

    const tasks = [
        "Rescue & Evacuation",
        "Shelter Management",
        "Food and Water Distribution",
        "Medical Assistance",
        "Inventory Management",
        "Field Coordination",
        "Communication and Awareness",
    ];

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/volunteers")
            .then((res) => setVolunteers(res.data))
            .catch((err) => console.error("Failed to fetch volunteers", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/volunteer-task", {
                volunteerEmail: selectedVolunteer,
                task: selectedTask,
                assignedBy: ngoEmail,
            })
            .then((res) => {
                alert("Task assigned successfully!");
                setSelectedVolunteer("");
                setSelectedTask("");
            })
            .catch((err) => {
                console.error("Failed to assign task", err);
                alert("Failed to assign task.");
            });
    };

    return (
        <div className="container-ngo">
            <h2 className="title-ngo">NGO Dashboard</h2>
            <p className="welcome-text-ngo">Welcome, {ngoEmail}</p>

            <form onSubmit={handleSubmit} className="form-ngo">
                <label htmlFor="volunteer-select" className="label-ngo">
                    Choose Volunteer:
                </label>
                <select
                    id="volunteer-select-ngo"
                    value={selectedVolunteer}
                    onChange={(e) => setSelectedVolunteer(e.target.value)}
                    required
                    className="select-ngo"
                >
                    <option value="">--Select Volunteer--</option>
                    {volunteers.map((v, idx) => (
                        <option key={idx} value={v.email}>
                            {v.email}
                        </option>
                    ))}
                </select>

                <label htmlFor="task-select" className="label-ngo">
                    Assign Task:
                </label>
                <select
                    id="task-select"
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    required
                    className="select-ngo"
                >
                    <option value="">--Select Task--</option>
                    {tasks.map((task, idx) => (
                        <option key={idx} value={task}>
                            {task}
                        </option>
                    ))}
                </select>

                <button type="submit" className="button-ngo">
                    Assign Task
                </button>
            </form>
        </div>
    );
}

export default NGODashboard;
