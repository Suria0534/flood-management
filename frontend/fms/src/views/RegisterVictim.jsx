import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registervictim.css';

function RegisterVictim() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        location: '',
        needs: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register/victim', form);
            // alert('Victim registered successfully');
            navigate("/dashboard/victim", { state: { email: form.email } });
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-regvic" noValidate>
            <h2 className="title-regvic">Victim Registration</h2>

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
                placeholder="Needs"
                onChange={handleChange}
                value={form.needs}
                className="input-regvic"
            />

            <button type="submit" className="button-regvic">Register</button>
        </form>
    );
}

export default RegisterVictim;
