// // src/views/LoginPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/login.css';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         if (!email || !role) {
//             alert('Please enter your email and select a role');
//             return;
//         }

//         try {
//             const response = await axios.post(`http://localhost:5000/api/login/${role}`, { email });

//             if (response.data.exists) {
//                 navigate(`/dashboard/${role}`, { state: { email } });
//             } else {
//                 alert('Email not found. Please register.');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('An error occurred during login');
//         }
//     };

//     return (
//         <div className="container-login">
//             <h2 className="title-login">Login</h2>

//             <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-login"
//             />

//             <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="select-login"
//             >
//                 <option value="">Select Role</option>
//                 <option value="victim">Victim</option>
//                 <option value="volunteer">Volunteer</option>
//                 <option value="ngo">NGO</option>
//                 <option value="official">Official</option>
//             </select>

//             <button className="button-login" onClick={handleLogin}>
//                 Login
//             </button>
//         </div>
//     );
// };

// export default LoginPage;






// // src/views/LoginPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/login.css';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         if (!email || !password || !role) {
//             alert('Please enter email, password, and select a role');
//             return;
//         }

//         try {
//             const response = await axios.post(`http://localhost:5000/api/login/${role}`, { email, password });

//             if (response.data.exists) {
//                 navigate(`/dashboard/${role}`, { state: { email } });
//             } else {
//                 alert(response.data.message || 'Email or password incorrect. Please try again.');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('An error occurred during login');
//         }
//     };

//     return (
//         <div className="container-login">
//             <h2 className="title-login">Login</h2>

//             <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-login"
//             />

//             <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input-login"
//             />

//             <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="select-login"
//             >
//                 <option value="">Select Role</option>
//                 <option value="victim">Victim</option>
//                 <option value="volunteer">Volunteer</option>
//                 <option value="ngo">NGO</option>
//                 <option value="official">Official</option>
//             </select>

//             <button className="button-login" onClick={handleLogin}>
//                 Login
//             </button>
//         </div>
//     );
// };

// export default LoginPage;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/login.css';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         if (!email || !password || !role) {
//             alert('Please enter email, password, and select a role');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 `http://localhost:5000/api/login/${role}`,
//                 { email, password }
//             );

//             if (response.data.exists) {
//                 // Backend response theke email and token extract
//                 const userEmail = response.data.email || email;
//                 const userToken = response.data.token || null;

//                 navigate(`/dashboard/${role}`, {
//                     state: { email: userEmail, token: userToken },
//                 });
//             } else {
//                 alert(response.data.message || 'Email or password incorrect. Please try again.');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('An error occurred during login');
//         }
//     };

//     return (
//         <div className="container-login">
//             <h2 className="title-login">Login</h2>

//             <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-login"
//             />

//             <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input-login"
//             />

//             <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="select-login"
//             >
//                 <option value="">Select Role</option>
//                 <option value="victim">Victim</option>
//                 <option value="volunteer">Volunteer</option>
//                 <option value="ngo">NGO</option>
//                 <option value="official">Official</option>
//             </select>

//             <button className="button-login" onClick={handleLogin}>
//                 Login
//             </button>
//         </div>
//     );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword || !role) {
            alert('Please enter email, password, and select a role');
            return;
        }

        setLoading(true); // Disable button while request pending

        try {
            const response = await axios.post(
                `http://localhost:5000/api/login/${role}`,
                { email: trimmedEmail, password: trimmedPassword }
            );

            if (response.data.exists) {
                const userEmail = response.data.email || trimmedEmail;
                const userToken = response.data.token || null;

                // Save token in localStorage (optional)
                localStorage.setItem('token', userToken);
                localStorage.setItem('role', role);
                localStorage.setItem('email', userEmail);

                // Navigate to dashboard
                navigate(`/dashboard/${role}`, {
                    state: { email: userEmail, token: userToken },
                });
            } else {
                alert(response.data.message || 'Email or password incorrect. Please try again.');
            }
        } catch (error) {
            // Detailed error logging
            console.error('Login error:', error.response || error);
            if (error.response) {
                const { status, data } = error.response;
                if (status === 401) alert(data.message || 'Invalid email or password.');
                else if (status === 400) alert(data.message || 'Invalid role or missing fields.');
                else if (status === 500) alert(data.message || 'Server error. Try again later.');
                else alert('An unexpected error occurred.');
            } else {
                alert('Cannot connect to server.');
            }
        } finally {
            setLoading(false);
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

            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
                className="button-login"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
};

export default LoginPage;
