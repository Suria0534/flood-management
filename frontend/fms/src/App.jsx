// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './views/HomePage';
import RegisterVictim from './views/RegisterVictim';
import RegisterVolunteer from './views/RegisterVolunteers';
import RegisterNGO from './views/RegisterNGO';
import RegisterOfficial from './views/RegisterOfficials';

import VictimDashboard from './views/VictimDashboard';
import VolunteerDashboard from './views/VolunteersDashboard';
import NGODashboard from './views/NgoDashboard';
import OfficialDashboard from './views/OfficialsDashboard';
import LoginPage from './views/LoginPage';
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
      </Routes>
    </Router>
  );
}

export default App;
