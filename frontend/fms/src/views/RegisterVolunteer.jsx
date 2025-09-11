// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/registervolunteers.css";

// function RegisterVolunteer() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         age: "",
//         skills: "",
//         available: "",
//     });
//     const navigate = useNavigate();

//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const volunteerData = {
//                 ...form,
//                 available: form.available === "true",
//                 location: {
//                     type: "Point",
//                     coordinates: [90.4125, 23.8103], // fallback Dhaka
//                 },
//             };

//             const res = await axios.post(
//                 "http://localhost:5000/api/register/volunteer",
//                 volunteerData
//             );

//             // ✅ Save email in localStorage for dashboard
//             localStorage.setItem("volunteerEmail", form.email);

//             // ✅ Navigate to dashboard
//             navigate("/dashboard/volunteer", { state: { email: form.email } });
//         } catch (err) {
//             console.error(err.response?.data || err.message);
//             alert("Registration failed.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="container-regvolun" noValidate>
//             <h2 className="title-regvolun">Volunteer Registration</h2>
//             <input
//                 name="name"
//                 placeholder="Name"
//                 onChange={handleChange}
//                 value={form.name}
//                 required
//             />
//             <input
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 value={form.email}
//                 required
//             />
//             <input
//                 name="age"
//                 type="number"
//                 placeholder="Age"
//                 onChange={handleChange}
//                 value={form.age}
//                 min="0"
//                 required
//             />
//             <input
//                 name="skills"
//                 placeholder="Skills"
//                 onChange={handleChange}
//                 value={form.skills}
//             />
//             <input
//                 name="available"
//                 placeholder="Available (true/false)"
//                 onChange={handleChange}
//                 value={form.available}
//                 required
//             />
//             <button type="submit" className="button-regvolun">
//                 Register
//             </button>
//         </form>
//     );
// }

// export default RegisterVolunteer;




// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import '../styles/registervolunteers.css';

// function RegisterVolunteer() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     skills: "",
//     password: "",
//     available: "true",
//     location: "" // manually input
//   });
//   const navigate = useNavigate();

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       if (!form.location) {
//         alert("Please enter your location");
//         return;
//       }

//       const volunteerData = {
//         ...form,
//         available: form.available === "true"
//       };

//       const res = await axios.post("http://localhost:5000/api/volunteer/register", volunteerData);

//       localStorage.setItem("volunteerEmail", form.email);
//       navigate("/dashboard/volunteer", { state: { email: form.email } });
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("Registration failed. Check console for details.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Volunteer Registration</h2>
//       <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
//       <input name="email" placeholder="Email" type="email" onChange={handleChange} value={form.email} required />
//       <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
//       <input name="skills" placeholder="Skills" onChange={handleChange} value={form.skills} />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} value={form.password} required />
//       <input name="available" placeholder="Available (true/false)" onChange={handleChange} value={form.available} required />
//       <input name="location" placeholder="Your Location (City, Area)" onChange={handleChange} value={form.location} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// }

// export default RegisterVolunteer;







import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/registervolunteers.css';

function RegisterVolunteer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    password: "",
    available: "true",
    location: ""
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password || !form.location || !form.phone) {
        alert("Please fill all required fields (Name, Email, Password, Phone, Location)");
        return;
      }

      const volunteerData = {
        ...form,
        available: form.available === "true"
      };

      await axios.post("http://localhost:5000/api/volunteer/register", volunteerData);

      localStorage.setItem("volunteerEmail", form.email);
      navigate("/dashboard/volunteer", { state: { email: form.email } });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Volunteer Registration</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} value={form.email} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} required />
      <input name="skills" placeholder="Skills" onChange={handleChange} value={form.skills} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} value={form.password} required />
      <input name="available" placeholder="Available (true/false)" onChange={handleChange} value={form.available} />
      <input name="location" placeholder="Your Location (City, Area)" onChange={handleChange} value={form.location} required />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterVolunteer;
