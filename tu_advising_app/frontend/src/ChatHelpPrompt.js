import React, { useEffect, useRef } from "react";
import './Styles/ChatHelpPrompt.css';

function ChatHelpPrompt({ closeBubble, messages, setMessages }) {
  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Trigger server-side response when the user sends a message
    if (messages.length > 0 && messages[messages.length - 1].type === "user") {
      const userMessage = messages[messages.length - 1].text;

      // Send the message to the server
      fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Append the server's response to the messages
          const newMessages = [
            ...messages,
            { type: "system", text: data.response },
          ];
          setMessages(newMessages);
        })
        .catch((error) => {
          console.error("Error fetching server response:", error);
          const newMessages = [
            ...messages,
            { type: "system", text: "Sorry, I couldn't process your request." },
          ];
          setMessages(newMessages);
        });
    }
  }, [messages, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-messages-container">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.type === "user" ? "user" : "system"}`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatHelpPrompt;
