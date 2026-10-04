import React, { useState } from 'react';
import '../styles/sosButton.css';

const SOSButton = ({ numbers = [] }) => {
  const [selected, setSelected] = useState('');
  const [status, setStatus] = useState('');

  const handleCall = () => {
    if (!selected) {
      setStatus('No number selected');
      return;
    }
    window.location.href = `tel:${selected}`;
  };

  return (
    <div className="sos-container">
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select a number</option>
        {numbers.map((num, idx) => (
          <option key={idx} value={num}>{num}</option>
        ))}
      </select>
      <button className="sos-button" onClick={handleCall}>Call</button>
      {status && <p className="sos-status">{status}</p>}
    </div>
  );
};

export default SOSButton;
