// src/views/RoleRegisterPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/register.css';

const RoleRegisterPage = () => {
    const { role } = useParams(); // URL থেকে role নেবে
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // Extra fields per role (example)
    const [organization, setOrganization] = useState(''); // For NGO
    const [address, setAddress] = useState(''); // For victim

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = { name, email, phone, password };

        // Role specific fields
        if (role === 'ngo') payload.organization = organization;
        if (role === 'victim') payload.address = address;

        try {
            const response = await axios.post(`http://localhost:5000/api/register/${role}`, payload);
            if (response.data.success) {
                alert(`${role} registered successfully!`);
                navigate('/login'); // Registration success → go to login
            } else {
                alert(`Registration failed: ${response.data.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error registering user');
        }
    };

    return (
        <div className="container-register">
            <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {/* Role-specific fields */}
                {role === 'ngo' && (
                    <input
                        type="text"
                        placeholder="Organization Name"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        required
                    />
                )}
                {role === 'victim' && (
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                )}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RoleRegisterPage;
