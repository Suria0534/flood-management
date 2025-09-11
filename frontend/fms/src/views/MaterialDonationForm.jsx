// // import React, { useState } from "react";
// // import axios from "axios";
// // import "../styles/MaterialDonationForm.css";


// // const MaterialDonationForm = () => {
// //   const [donorName, setDonorName] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [selectedItems, setSelectedItems] = useState([]);
// //   const [collectionPlace, setCollectionPlace] = useState("");
// //   const [message, setMessage] = useState("");

// //   // Predefined items
// //   const items = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

// //   const handleItemChange = (e) => {
// //     const { value, checked } = e.target;
// //     if (checked) {
// //       setSelectedItems([...selectedItems, value]);
// //     } else {
// //       setSelectedItems(selectedItems.filter((item) => item !== value));
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (selectedItems.length === 0) {
// //       setMessage("Please select at least one item.");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post("http://localhost:5000/api/material-donations", {
// //         donorName,
// //         phone,
// //         items: selectedItems,
// //         collectionPlace,
// //       });

// //       setMessage(res.data.message);
// //       setDonorName("");
// //       setPhone("");
// //       setSelectedItems([]);
// //       setCollectionPlace("");
// //     } catch (error) {
// //       console.error(error);
// //       setMessage("Error submitting donation");
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* <h2>Material Donation Form</h2> */}
// //       {message && <p>{message}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Your Name"
// //           value={donorName}
// //           onChange={(e) => setDonorName(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="text"
// //           placeholder="Phone Number"
// //           value={phone}
// //           onChange={(e) => setPhone(e.target.value)}
// //           required
// //         />

// //         <div>
// //           <p>Select Items to Donate:</p>
// //           {items.map((item) => (
// //             <label key={item} style={{ display: "block" }}>
// //               <input
// //                 type="checkbox"
// //                 value={item}
// //                 checked={selectedItems.includes(item)}
// //                 onChange={handleItemChange}
// //               />
// //               {item}
// //             </label>
// //           ))}
// //         </div>

// //         <input
// //           type="text"
// //           placeholder="Collection Place"
// //           value={collectionPlace}
// //           onChange={(e) => setCollectionPlace(e.target.value)}
// //           required
// //         />

// //         <button type="submit">Donate</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default MaterialDonationForm;




// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/MaterialDonationForm.css";

// const MaterialDonationForm = () => {
//   const [donorEmail, setDonorEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [collectionPlace, setCollectionPlace] = useState("");
//   const [message, setMessage] = useState("");

//   const items = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

//   const handleItemChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setSelectedItems([...selectedItems, value]);
//     } else {
//       setSelectedItems(selectedItems.filter((item) => item !== value));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedItems.length === 0) {
//       setMessage("Please select at least one item.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/material-donations", {
//         donorEmail,
//         phone,
//         items: selectedItems,
//         collectionPlace,
//       });

//       setMessage(res.data.message);
//       setDonorEmail("");
//       setPhone("");
//       setSelectedItems([]);
//       setCollectionPlace("");
//     } catch (error) {
//       console.error(error);
//       setMessage("Error submitting donation");
//     }
//   };

//   return (
//     <div>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={donorEmail}
//           onChange={(e) => setDonorEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//         />

//         <div>
//           <p>Select Items to Donate:</p>
//           {items.map((item) => (
//             <label key={item} style={{ display: "block" }}>
//               <input
//                 type="checkbox"
//                 value={item}
//                 checked={selectedItems.includes(item)}
//                 onChange={handleItemChange}
//               />
//               {item}
//             </label>
//           ))}
//         </div>

//         <input
//           type="text"
//           placeholder="Collection Place"
//           value={collectionPlace}
//           onChange={(e) => setCollectionPlace(e.target.value)}
//           required
//         />

//         <button type="submit">Donate</button>
//       </form>
//     </div>
//   );
// };

// export default MaterialDonationForm;








// components/MaterialDonationForm.jsx
import React, { useState } from "react";
import axios from "axios";

const MaterialDonationForm = ({ volunteerEmail }) => {
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([]);
  const [collectionPlace, setCollectionPlace] = useState("");

  const allItems = ["Food", "Water", "Clothes", "Medicine", "Blankets", "Other"];

  const handleItemChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setItems([...items, value]);
    else setItems(items.filter(item => item !== value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return alert("Select at least one item.");
    try {
      await axios.post("http://localhost:5000/api/donations/material", {
        donorEmail: volunteerEmail,
        phone,
        items,
        collectionPlace,
        donorName: volunteerEmail, // using email as name
      });

      alert("Material donation submitted!");
      setPhone("");
      setItems([]);
      setCollectionPlace("");
    } catch (err) {
      console.error(err);
      alert("Error submitting material donation.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />

      <div>
        <p>Select Items to Donate:</p>
        {allItems.map(item => (
          <label key={item}>
            <input type="checkbox" value={item} checked={items.includes(item)} onChange={handleItemChange} />
            {item}
          </label>
        ))}
      </div>

      <input placeholder="Collection Place" value={collectionPlace} onChange={e => setCollectionPlace(e.target.value)} required />

      <button type="submit">Donate</button>
    </form>
  );
};

export default MaterialDonationForm;
