// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './views/HomePage';
import RegisterVictim from './views/RegisterVictim';
import RegisterVolunteer from './views/RegisterVolunteer';
import RegisterNGO from './views/RegisterNGO';
import RegisterOfficial from './views/RegisterOfficial';
import VictimDashboard from './views/VictimDashboard';
import VolunteerDashboard from './views/VolunteerDashboard';
import NGODashboard from './views/NgoDashboard';
import OfficialDashboard from './views/OfficialDashboard';
import LoginPage from './views/LoginPage';
import FundDonationForm from './views/FundDonationForm';
import MaterialDonationForm from './views/MaterialDonationForm';
import ShelterPage from './views/ShelterCard';
import ResourcePage from "./views/ResourcePage";
import AdminDashboard from "./views/AdminDashboard"; 
import AdminLogin from "./views/AdminLogin";
import PrivateRoute from "./views/PrivateRoute";
// import RoleRegisterPage from './views/RoleRegisterPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register/victim" element={<RegisterVictim />} />
        <Route path="/register/volunteer" element={<RegisterVolunteer />} />
        <Route path="/register/ngo" element={<RegisterNGO />} />
        <Route path="/register/official" element={<RegisterOfficial />} />
        <Route path="/dashboard/victim" element={<VictimDashboard />} />
        <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
        <Route path="/dashboard/official" element={<OfficialDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/donations/fund" element={<FundDonationForm />} />
        <Route path="/donations/material" element={<MaterialDonationForm />} />
        <Route path="/shelters" element={<ShelterPage />} />
        <Route path="/resources" element={<ResourcePage />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />

        {/* <Route path="/register/:role" element={<RoleRegisterPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
