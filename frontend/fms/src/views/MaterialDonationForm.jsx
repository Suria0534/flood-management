import React, { useState } from "react";
import axios from "axios";
import "../styles/MaterialDonationForm.css";


const MaterialDonationForm = () => {
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [collectionPlace, setCollectionPlace] = useState("");
  const [message, setMessage] = useState("");

  // Predefined items
  const items = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setMessage("Please select at least one item.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/material-donations", {
        donorName,
        phone,
        items: selectedItems,
        collectionPlace,
      });

      setMessage(res.data.message);
      setDonorName("");
      setPhone("");
      setSelectedItems([]);
      setCollectionPlace("");
    } catch (error) {
      console.error(error);
      setMessage("Error submitting donation");
    }
  };

  return (
    <div>
      {/* <h2>Material Donation Form</h2> */}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <div>
          <p>Select Items to Donate:</p>
          {items.map((item) => (
            <label key={item} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={handleItemChange}
              />
              {item}
            </label>
          ))}
        </div>

        <input
          type="text"
          placeholder="Collection Place"
          value={collectionPlace}
          onChange={(e) => setCollectionPlace(e.target.value)}
          required
        />

        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default MaterialDonationForm;
