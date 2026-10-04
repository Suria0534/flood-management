// // // src/views/CommunityChat.jsx
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "../styles/communityChat.css"; // create your own CSS

// // function CommunityChat({ userName, userEmail, userPhone, userLocation }) {
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState("");

// //   // Fetch all chat messages
// //   const fetchMessages = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/chat/messages");
// //       if (res.data.success) setMessages(res.data.chats);
// //     } catch (err) {
// //       console.error("Error fetching messages:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMessages();

// //     // Optional: poll every 3 seconds to get new messages
// //     const interval = setInterval(fetchMessages, 3000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Send a new message
// //   const handleSend = async () => {
// //     if (!newMessage.trim()) return;

// //     try {
// //       await axios.post("http://localhost:5000/api/chat/messages", {
// //         senderName: userName,
// //         senderEmail: userEmail,
// //         senderPhone: userPhone,
// //         senderLocation: userLocation,
// //         message: newMessage,
// //       });
// //       setNewMessage("");
// //       fetchMessages(); // refresh chat
// //     } catch (err) {
// //       console.error("Error sending message:", err);
// //     }
// //   };

// //   return (
// //     <div className="community-chat-container">
// //       <div className="chat-messages">
// //         {messages.length === 0 && <p>No messages yet.</p>}
// //         {messages.map((msg) => (
// //           <div key={msg._id} className="chat-message">
// //             <p>
// //               <strong>{msg.senderName}</strong> ({msg.senderEmail}, {msg.senderPhone}, {msg.senderLocation})
// //             </p>
// //             <p>{msg.message}</p>
// //             <hr />
// //           </div>
// //         ))}
// //       </div>
// //       <div className="chat-input">
// //         <input
// //           type="text"
// //           placeholder="Type your message..."
// //           value={newMessage}
// //           onChange={(e) => setNewMessage(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //         />
// //         <button onClick={handleSend}>Send</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CommunityChat;




// // src/views/CommunityChat.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/communityChat.css";

// function CommunityChat({ userName, userEmail, userPhone, userLocation, userRole }) {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // -----------------------------
//   // Fetch all chat messages
//   // -----------------------------
//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/chat/messages");
//       if (res.data.success) setMessages(res.data.chats);
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 3000); // poll every 3 sec
//     return () => clearInterval(interval);
//   }, []);

//   // -----------------------------
//   // Send a new message
//   // -----------------------------
//   const handleSend = async () => {
//     if (!newMessage.trim()) return;

//     // Ensure required fields are valid
//     const safeUserName = userName || "Anonymous";
//     const safeUserLocation =
//       typeof userLocation === "string" ? userLocation : JSON.stringify(userLocation || {});

//     const payload = {
//       senderName: safeUserName,
//       senderEmail: userEmail || "",
//       senderPhone: userPhone || "",
//       senderLocation: safeUserLocation,
//       role: userRole || "User", // default to User if not provided
//       message: newMessage,
//     };

//     console.log("Sending payload:", payload); // Debugging

//     try {
//       await axios.post("http://localhost:5000/api/chat/messages", payload);
//       setNewMessage("");
//       fetchMessages(); // refresh chat
//     } catch (err) {
//       console.error("Error sending message:", err);
//       alert(
//         err.response?.data?.message ||
//           "Failed to send message. Make sure all required fields are correct."
//       );
//     }
//   };

//   return (
//     <div className="community-chat-container">
//       <div className="chat-messages">
//         {messages.length === 0 && <p>No messages yet.</p>}
//         {messages.map((msg) => (
//           <div key={msg._id} className="chat-message">
//             <p>
//               <strong>
//                 {msg.senderName} ({msg.role})
//               </strong>{" "}
//               - {msg.senderEmail}, {msg.senderPhone}, {msg.senderLocation}
//             </p>
//             <p>{msg.message}</p>
//             <hr />
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default CommunityChat;





// src/views/CommunityChat.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/communityChat.css";

function CommunityChat({ userName, userEmail, userPhone, userLocation, userRole }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/chat/messages");
      if (res.data.success) {
        setMessages(res.data.chats);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // refresh every 3 sec
    return () => clearInterval(interval);
  }, []);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/chat/messages", {
        senderName: userName || "Anonymous",
        senderEmail: userEmail || "N/A",
        senderPhone: userPhone || "N/A",
        senderLocation: userLocation || "Unknown Place",
        role: userRole || "User",
        message: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="community-chat-container">
      <div className="chat-messages">
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg) => (
          <div key={msg._id} className="chat-message">
            <p>
              <strong>
                {msg.senderName || "Anonymous"} ({msg.role || "User"})
              </strong>{" "}
              - {msg.senderEmail || "N/A"}, {msg.senderPhone || "N/A"}, {msg.senderLocation || "Unknown Place"}
            </p>
            <p>{msg.message}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default CommunityChat;
