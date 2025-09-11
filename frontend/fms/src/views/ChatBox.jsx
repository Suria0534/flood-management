import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatBox = ({ roomId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/messages/${roomId}`);
        setMessages(res.data.chats || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [roomId]);

  // Send new message
  const handleSend = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/chat/messages`, {
        receiver: "community",   // community chat room
        message: newMsg
      }, {
        headers: {
          "Content-Type": "application/json",
          "user-name": userName   // pass sender via header or state
        }
      });
      setMessages(prev => [...prev, res.data.chat]);
      setNewMsg("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-box">
      <h3>Community Chat</h3>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.senderName || msg.sender}: </strong> {msg.message}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        placeholder="Type a message..." 
        value={newMsg} 
        onChange={e => setNewMsg(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
