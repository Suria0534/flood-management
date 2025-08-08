import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registervolunteers.css';

function RegisterVolunteer() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        skills: '',
        available: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register/volunteer', form);
            // alert('Volunteer registered successfully');
            navigate("/dashboard/volunteer", { state: { email: form.email } });
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-regvolun" noValidate>
            <h2 className="title-regvolun">Volunteer Registration</h2>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                className="input-regvolun"
                required
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                className="input-regvolun"
                required
            />

            <input
                name="age"
                type="number"
                placeholder="Age"
                onChange={handleChange}
                value={form.age}
                className="input-regvolun"
                required
                min="0"
            />

            <input
                name="skills"
                placeholder="Skills"
                onChange={handleChange}
                value={form.skills}
                className="input-regvolun"
            />

            <input
                name="available"
                placeholder="Available (true/false)"
                onChange={handleChange}
                value={form.available}
                className="input-regvolun"
            />

            <button type="submit" className="button-regvolun">Register</button>
        </form>
    );
}

export default RegisterVolunteer;
