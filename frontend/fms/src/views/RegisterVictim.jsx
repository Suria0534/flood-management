// src/views/RegisterVictim.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registervictim.css'; // Ensure to add proper CSS

function RegisterVictim() {
    // State to handle form data
    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        location: '',
        needs: ''
    });

    // State to handle error and success messages
    const [error, setError] = useState(null);  // For error messages
    const [success, setSuccess] = useState(null); // For success messages

    const navigate = useNavigate();

    // Handle input change for all form fields
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Clear previous errors
        setSuccess(null);  // Clear previous success messages

        // Basic validation for required fields
        if (!form.name || !form.email || !form.age || !form.location) {
            setError('All fields are required!');
            return;
        }

        // Check if age is a valid number
        if (parseInt(form.age) <= 0) {
            setError('Age must be greater than 0');
            return;
        }

        try {
            // Send form data to backend API
            const response = await axios.post('http://localhost:5000/api/register/victim', form);

            // If registration is successful, show success message and navigate
            if (response.status === 200) {
                setSuccess('Victim registered successfully!');
                navigate("/dashboard/victim", { state: { email: form.email } });
            } else {
                // If the response status isn't 200, set error message
                setError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            // Handle any errors from the backend
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-regvic" noValidate>
            <h2 className="title-regvic">Victim Registration</h2>

            {/* Show error message if any */}
            {error && <p className="error-message">{error}</p>}

            {/* Show success message if registration is successful */}
            {success && <p className="success-message">{success}</p>}

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                className="input-regvic"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                className="input-regvic"
                required
            />

            <input
                name="age"
                type="number"
                placeholder="Age"
                onChange={handleChange}
                value={form.age}
                className="input-regvic"
                required
                min="0"
            />

            <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                value={form.location}
                className="input-regvic"
                required
            />

            <input
                name="needs"
                placeholder="Needs (optional)"
                onChange={handleChange}
                value={form.needs}
                className="input-regvic"
            />

            <button type="submit" className="button-regvic">Register</button>
        </form>
    );
}

export default RegisterVictim;
