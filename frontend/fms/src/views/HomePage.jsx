// src/views/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const roleButtons = [
        { label: 'Register as Victim', path: '/register/victim' },
        { label: 'Register as Volunteer', path: '/register/volunteer' },
        { label: 'Register as NGO', path: '/register/ngo' },
        { label: 'Register as Official', path: '/register/official' },
    ];

    return (
        <div className="container">
            <h1 className="title">Flood Registration System</h1>
            <h2 className="subtitle">Select Your Role</h2>

            <div className="button-container">
                {roleButtons.map((btn) => (
                    <button
                        key={btn.path}
                        className="button"
                        onClick={() => navigate(btn.path)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <button className="login-button" onClick={() => navigate('/login')}>
                Login
            </button>
        </div>
    );
};

export default HomePage;
