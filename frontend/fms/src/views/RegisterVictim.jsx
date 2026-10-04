
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/registervictim.css';

// function RegisterVictim() {
//     // Form state
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         age: '',
//         location: '',
//         needs: ''
//     });

//     // Error & success messages
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);

//     const navigate = useNavigate();

//     // Handle input changes
//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         // Validate required fields
//         if (!form.name || !form.email || !form.phone || !form.age || !form.location) {
//             setError('All fields except "Needs" are required!');
//             return;
//         }

//         // Validate age
//         const ageNum = parseInt(form.age);
//         if (isNaN(ageNum) || ageNum <= 0) {
//             setError('Age must be a valid number greater than 0');
//             return;
//         }

//         try {
//             // Send registration data to backend
//             const response = await axios.post('http://localhost:5000/api/register/victim', form);

//             if (response.status === 200) {
//                 setSuccess('Victim registered successfully!');

//                 // Navigate to dashboard with victimId + email
//                 const victimData = response.data; // backend থেকে আসা নতুন victim object
//                 navigate("/dashboard/victim", { state: { 
//                     email: victimData.email, 
//                     victimId: victimData._id 
//                 } });
//             } else {
//                 setError(response.data.message || 'Registration failed. Please try again.');
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || 'Registration failed. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="container-regvic" noValidate>
//             <h2 className="title-regvic">Victim Registration</h2>

//             {error && <p className="error-message">{error}</p>}
//             {success && <p className="success-message">{success}</p>}

//             <input
//                 name="name"
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="input-regvic"
//                 required
//             />

//             <input
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="input-regvic"
//                 required
//             />

//             <input
//                 name="phone"
//                 type="tel"
//                 placeholder="Phone Number"
//                 value={form.phone}
//                 onChange={handleChange}
//                 className="input-regvic"
//                 required
//             />

//             <input
//                 name="age"
//                 type="number"
//                 placeholder="Age"
//                 value={form.age}
//                 onChange={handleChange}
//                 className="input-regvic"
//                 required
//                 min="1"
//             />

//             <input
//                 name="location"
//                 placeholder="Location"
//                 value={form.location}
//                 onChange={handleChange}
//                 className="input-regvic"
//                 required
//             />

//             <input
//                 name="needs"
//                 placeholder="Needs (optional)"
//                 value={form.needs}
//                 onChange={handleChange}
//                 className="input-regvic"
//             />

//             <button type="submit" className="button-regvic">Register</button>
//         </form>
//     );
// }

// export default RegisterVictim;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/registervictim.css';

const RegisterVictim = () => {
  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    needs: '',
    password: '' // added password
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const location = form.location.trim();
    const password = form.password;

    if (!name || !email || !phone || !location || !password) {
      setError('All fields except "Needs" are required.');
      return;
    }
    if (!/^[A-Za-z][A-Za-z ]{1,49}$/.test(name)) {
      setError('Name must contain letters and spaces only.');
      return;
    }
    if (!/^(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError('Enter a valid 11-digit Bangladesh phone number.');
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register/victim', {
        ...form,
        name,
        email,
        phone,
        location,
      });

      if (response.status === 201) {
        setSuccess('Victim registered successfully!');
        const victimData = response.data.victim;
        navigate("/dashboard/victim", { state: { email: victimData.email, victimId: victimData._id } });
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container-regvic" noValidate>
      <h2 className="title-regvic">Victim Registration</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="input-regvic"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input-regvic"
        required
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="input-regvic"
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="input-regvic"
        required
      />

      <input
        name="needs"
        placeholder="Needs (optional)"
        value={form.needs}
        onChange={handleChange}
        className="input-regvic"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input-regvic"
        required
      />

      <button type="submit" className="button-regvic">Register</button>
    </form>
  );
};

export default RegisterVictim;
