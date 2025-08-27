import React, { useState } from 'react';
import '../styles/sosButton.css';

const SOSButton = ({ phoneNumber }) => {
  const [status, setStatus] = useState('');

  const handleCall = () => {
    if (!phoneNumber) {
      setStatus('No number provided');
      return;
    }
    // Auto call using tel: link
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="sos-container">
      <button className="sos-button" onClick={handleCall}>
        SOS
      </button>
      {status && <p className="sos-status">{status}</p>}
    </div>
  );
};

export default SOSButton;
