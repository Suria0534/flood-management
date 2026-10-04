// import React, { useState } from "react";
// import FundDonationForm from "./FundDonationForm";
// import MaterialDonationForm from "./MaterialDonationForm";
// import "../styles/donateSection.css";

// const DonateSection = ({ volunteerEmail }) => {
//   const [activeTab, setActiveTab] = useState("fund");

//   return (
//     <div className="donate-section">
//       <h2 className="donate-title">Make a Donation</h2>
//       <p className="donate-subtitle">
//         Your support can help flood-affected families with shelter, food, and essentials.
//       </p>

//       <div className="donate-tabs">
//         <button
//           className={activeTab === "fund" ? "active" : ""}
//           onClick={() => setActiveTab("fund")}
//         >
//           Fund Donation
//         </button>
//         <button
//           className={activeTab === "material" ? "active" : ""}
//           onClick={() => setActiveTab("material")}
//         >
//           Material Donation
//         </button>
//       </div>

//       <div className="donate-form-container">
//         {activeTab === "fund" ? (
//           <FundDonationForm volunteerEmail={volunteerEmail} />
//         ) : (
//           <MaterialDonationForm volunteerEmail={volunteerEmail} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonateSection;


import React, { useState } from "react";
import FundDonationForm from "./FundDonationForm";
import MaterialDonationForm from "./MaterialDonationForm";
import "../styles/donateSection.css";

const DonateHeroSection = ({ volunteerEmail }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fund");

  return (
    <section className="donate-hero">
      <div className="donate-hero-card">
        <span className="donate-hero-icon">💰</span>
        <h2>Make a Donation</h2>
        <p>Your support helps flood-affected families with shelter, food, and essentials.</p>
        <button
          onClick={() => setOpen(prev => !prev)}
          style={{
            marginTop: "20px",
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            background: "#1a3d6c",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {open ? "Hide Donation Form" : "Donate Now"}
        </button>

        {open && (
          <div className="donate-tabs-container">
            <div className="donate-tabs">
              <button
                className={activeTab === "fund" ? "active" : ""}
                onClick={() => setActiveTab("fund")}
              >
                Fund Donation
              </button>
              <button
                className={activeTab === "material" ? "active" : ""}
                onClick={() => setActiveTab("material")}
              >
                Material Donation
              </button>
            </div>

            <div className="donate-form-container">
              {activeTab === "fund" ? (
                <FundDonationForm volunteerEmail={volunteerEmail} />
              ) : (
                <MaterialDonationForm volunteerEmail={volunteerEmail} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonateHeroSection;
