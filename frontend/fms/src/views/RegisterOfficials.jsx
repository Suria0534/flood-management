import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registerofficials.css';

function RegisterOfficial() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        designation: '',
        department: '',
        contact: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register/official', form);
            alert('Official registered successfully');
            navigate("/dashboard/official", { state: { email: form.email } });
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container-regoff" noValidate>
            <h2 className="title-regoff">Official Registration</h2>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                className="input-regoff"
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                className="input-regoff"
                required
            />
            <input
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
                value={form.designation}
                className="input-regoff"
                required
            />
            <input
                name="department"
                placeholder="Department"
                onChange={handleChange}
                value={form.department}
                className="input-regoff"
                required
            />
            <input
                name="contact"
                placeholder="Contact"
                onChange={handleChange}
                value={form.contact}
                className="input-regoff"
                required
            />

            <button type="submit" className="button-regoff">Register</button>
        </form>
    );
}

export default RegisterOfficial;
