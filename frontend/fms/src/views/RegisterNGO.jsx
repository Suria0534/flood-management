import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registerngo.css';

function RegisterNGO() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        contact: '',
        area: '',
        resources: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register/ngo', form);
            // alert('NGO registered successfully');
            navigate("/dashboard/ngo", { state: { email: form.email } });
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-regngo" noValidate>
            <h2 className="title-regngo">NGO Registration</h2>

            <input
                name="name"
                placeholder="NGO Name"
                onChange={handleChange}
                value={form.name}
                className="input-regngo"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                className="input-regngo"
                required
            />

            <input
                name="contact"
                placeholder="Contact"
                onChange={handleChange}
                value={form.contact}
                className="input-regngo"
                required
            />

            <input
                name="area"
                placeholder="Area"
                onChange={handleChange}
                value={form.area}
                className="input-regngo"
                required
            />

            <input
                name="resources"
                placeholder="Resources"
                onChange={handleChange}
                value={form.resources}
                className="input-regngo"
            />

            <button type="submit" className="button-regngo">Register</button>
        </form>
    );
}

export default RegisterNGO;
