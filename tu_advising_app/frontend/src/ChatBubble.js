import React, { useState, useEffect } from "react";
import "./Styles/ChatBubble.css";
import ChatIcon from "./Images/towson_tigers_logo_mascot.png";
import Intro from "./Intro";
import ChatHelpPrompt from "./ChatHelpPrompt";

function ChatBubble({ setFirstOpen, isIntro, setShowChatBubble }) {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat messages
  const [userInput, setUserInput] = useState(""); // Store user input

  useEffect(() => {
    setIsVisible(true); // Show the chat bubble on mount
  }, []);

  const closeBubble = () => {
    setIsVisible(false); // Hide the chat bubble
    setShowChatBubble(false);
    setFirstOpen(false);
  };

  const handleUserInput = (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      const newMessages = [...messages, { type: "user", text: userInput }];
      setMessages(newMessages);
      setUserInput(""); // Clear input field
    }
  };

  return (
    isVisible && (
      <div className="chat-overlay">
        <div className="chat-modal">
          <div className="chat-header">
            {isIntro && <h2>Welcome to the Towson Advising Portal! 👋</h2>}
            {!isIntro && <h2>What can I help with?</h2>}
            <button className="close-button" onClick={closeBubble}>
              ✖
            </button>
          </div>
          <div className="chat-content">
            {isIntro && <Intro />}
            {!isIntro && (
              <ChatHelpPrompt
                closeBubble={closeBubble}
                messages={messages}
                setMessages={setMessages}
              />
            )}
          </div>
          {!isIntro && (
            <form className="chat-input-bar" onSubmit={handleUserInput}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
        <img src={ChatIcon} alt="Chat Assistant" className="chat-bubble-image" />
      </div>
    )
  );
}

export default ChatBubble;
