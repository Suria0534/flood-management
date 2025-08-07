// src/views/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !role) {
            alert('Please enter your email and select a role');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/login/${role}`, { email });

            if (response.data.exists) {
                navigate(`/dashboard/${role}`, { state: { email } });
            } else {
                alert('Email not found. Please register.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <div className="container-login">
            <h2 className="title-login">Login</h2>

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-login"
            />

            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select-login"
            >
                <option value="">Select Role</option>
                <option value="victim">Victim</option>
                <option value="volunteer">Volunteer</option>
                <option value="ngo">NGO</option>
                <option value="official">Official</option>
            </select>

            <button className="button-login" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
