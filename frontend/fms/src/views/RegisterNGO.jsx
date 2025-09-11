// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/registerngo.css';

// function RegisterNGO() {
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         contact: '',
//         area: '',
//         resources: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/register/ngo', form);
//             // alert('NGO registered successfully');
//             navigate("/dashboard/ngo", { state: { email: form.email } });
//         } catch (err) {
//             alert('Registration failed');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="container-regngo" noValidate>
//             <h2 className="title-regngo">NGO Registration</h2>

//             <input
//                 name="name"
//                 placeholder="NGO Name"
//                 onChange={handleChange}
//                 value={form.name}
//                 className="input-regngo"
//                 required
//             />

//             <input
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 value={form.email}
//                 className="input-regngo"
//                 required
//             />

//             <input
//                 name="contact"
//                 placeholder="Contact"
//                 onChange={handleChange}
//                 value={form.contact}
//                 className="input-regngo"
//                 required
//             />

//             <input
//                 name="area"
//                 placeholder="Area"
//                 onChange={handleChange}
//                 value={form.area}
//                 className="input-regngo"
//                 required
//             />

//             <input
//                 name="resources"
//                 placeholder="Resources"
//                 onChange={handleChange}
//                 value={form.resources}
//                 className="input-regngo"
//             />

//             <button type="submit" className="button-regngo">Register</button>
//         </form>
//     );
// }

// export default RegisterNGO;





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/registerngo.css";

function NGORegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ngo/register", form);
      alert("NGO registered successfully!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="ngo-register-container">
      <h2>NGO Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="NGO Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default NGORegister;
