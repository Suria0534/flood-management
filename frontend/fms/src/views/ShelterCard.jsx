import React from "react";

const ShelterCard = ({ shelter, onAdd, onRemove }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h2>{shelter.name}</h2>
      <p>Location: {shelter.location}</p>
      <p>
        Occupancy: {shelter.currentOccupancy}/{shelter.capacity}{" "}
        {shelter.needsHelp && <span style={{ color: "red" }}>⚠ Help Needed</span>}
      </p>
      <button onClick={() => onAdd(shelter._id)}>Add Person</button>
      <button onClick={() => onRemove(shelter._id)}>Remove Person</button>
    </div>
  );
};

export default ShelterCard;
