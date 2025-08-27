import React, { useState } from "react";
import axios from "axios";
import "../styles/FundDonationForm.css";

const FundDonationForm = () => {
  const [donorName, setDonorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [transactionId, setTransactionId] = useState("");

  const paymentAccounts = {
    bkash: "Bkash Number: 017XXXXXXXX",
    nagad: "Nagad Number: 018XXXXXXXX",
    rocket: "Rocket Number: 019XXXXXXXX",
    bank: "Bank Account: BRAC Bank - 123456789",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      type: "fund",
      donorName,
      phoneNumber,
      amount,
      paymentMethod,
      transactionId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/donations",
        data
      );
      console.log(response.data);
      alert("Donation submitted successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error submitting donation.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <input
        type="text"
        placeholder="Donor Name"
        value={donorName}
        onChange={(e) => setDonorName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        required
      >
        <option value="bkash">Bkash</option>
        <option value="nagad">Nagad</option>
        <option value="rocket">Rocket</option>
        <option value="bank">Bank</option>
      </select>

      {/* Show payment account number dynamically */}
      <p className="payment-info">{paymentAccounts[paymentMethod]}</p>

      <input
        type="text"
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        required
      />

      <button type="submit">Donate</button>
    </form>
  );
};

export default FundDonationForm;
