// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import HomePage from './views/HomePage';
// import RegisterVictim from './views/RegisterVictim';
// import RegisterVolunteer from './views/RegisterVolunteer';
// import RegisterNGO from './views/RegisterNGO';
// import RegisterOfficial from './views/RegisterOfficial';
// import VictimDashboard from './views/VictimDashboard';
// import VolunteerDashboard from './views/VolunteerDashboard';
// import NGODashboard from './views/NgoDashboard';
// import OfficialDashboard from './views/OfficialDashboard';
// import LoginPage from './views/LoginPage';
// import FundDonationForm from './views/FundDonationForm';
// import MaterialDonationForm from './views/MaterialDonationForm';
// import ShelterPage from './views/ShelterCard';
// import ResourcePage from "./views/ResourcePage";
// import AdminDashboard from "./views/AdminDashboard"; 
// import AdminLogin from "./views/AdminLogin";
// import PrivateRoute from "./views/PrivateRoute";
// import CommunityUpdate from "./views/CommunityUpdates";
// {/* <Route path="/community" element={<CommunityUpdates />} /> */}

// // import RoleRegisterPage from './views/RoleRegisterPage';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/register/victim" element={<RegisterVictim />} />
//         <Route path="/register/volunteer" element={<RegisterVolunteer />} />
//         <Route path="/register/ngo" element={<RegisterNGO />} />
//         <Route path="/register/official" element={<RegisterOfficial />} />
//         <Route path="/dashboard/victim" element={<VictimDashboard />} />
//         <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
//         <Route path="/dashboard/ngo" element={<NGODashboard />} />
//         <Route path="/dashboard/official" element={<OfficialDashboard />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/donations/fund" element={<FundDonationForm />} />
//         <Route path="/donations/material" element={<MaterialDonationForm />} />
//         <Route path="/shelters" element={<ShelterPage />} />
//         <Route path="/resources" element={<ResourcePage />} />
//         {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route 
//           path="/admin/dashboard" 
//           element={
//             <PrivateRoute>
//               <AdminDashboard />
//             </PrivateRoute>
//           } 
//         />

//         <Route path="/community/:id" element={<CommunityUpdate />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



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
import ShelterPage from './views/ShelterDashboard';
import ResourcePage from "./views/ResourcePage";
import AdminDashboard from "./views/AdminDashboard"; 
import AdminLogin from "./views/AdminLogin";
import PrivateRoute from "./views/PrivateRoute";
import ChatBox from "./views/CommunityChat";

import CommunityUpdates from "./views/CommunityUpdates";
import NewsList from "./views/NewsList";
import NewsDetail from "./views/NewsDetail";
import AnnouncementsPage from "./views/AnnouncementsAndWeather";
// import WeatherPage from "./views/WeatherPage";
// import CommunityUpdate from "./views/CommunityUpdates";

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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Community Updates */}
        <Route path="/community" element={<CommunityUpdates />} />          {/* list page */}
        {/* <Route path="/community/:id" element={<CommunityUpdate />} />       single update page */}
        {/* Community Chat */}  
        <Route path="/community-chat" element={<ChatBox />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        {/* <Route path="/announcements" element={<AnnouncementsPage />} /> */}
        {/* <Route path="/weather" element={<WeatherPage />} /> */}
        <Route path="/announcements" element={<AnnouncementsPage />} />


      </Routes>
    </Router>
  );
}

export default App;
