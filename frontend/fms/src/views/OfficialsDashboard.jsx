import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/officialsdashboard.css";

function OfficialDashboard() {
    const location = useLocation();
    const email = location.state?.email || "No email provided";

    return (
        <div className="container-off">
            <h2 className="title-off">Official Dashboard</h2>
            <p className="welcome-text-off">Welcome, {email}</p>
            <p className="info-off">Locked Feature, will unlock on Sprint-2</p>
        </div>
    );
}

export default OfficialDashboard;
