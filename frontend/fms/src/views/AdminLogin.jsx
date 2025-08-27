import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;


// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/api/admin/login", {
//       username,
//       password,
//     });

//     const token = res.data.token;
//     localStorage.setItem("adminToken", token);

//     // Fetch admin info
//     const adminRes = await axios.get("http://localhost:5000/api/admin/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     localStorage.setItem("adminData", JSON.stringify(adminRes.data.admin));

//     navigate("/admin/dashboard");
//   } catch (err) {
//     setError(err.response?.data?.message || "Login failed");
//   }
// };
// export default AdminLogin;