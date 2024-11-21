// src/ChatBubble.js
import React, { useState, useEffect } from "react";
import "./Styles/ChatBubble.css";
import ChatIcon from "./Images/towson_tigers_logo_mascot.png";
import Intro from "./Intro";
import ChatHelpPrompt from "./ChatHelpPrompt";

function ChatBubble({setFirstOpen, isIntro, setShowChatBubble}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Show the chat bubble on mount
  }, []);

  const closeBubble = () => {
    setIsVisible(false); // Hide the chat bubble
    setShowChatBubble(false);
    setFirstOpen(false);
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
            {!isIntro && <ChatHelpPrompt closeBubble={closeBubble}/>}
        </div>
        </div>
        <img
            src={ChatIcon}
            alt="Chat Assistant"
            className="chat-bubble-image"
            />
    </div>
    )
  );
}

export default ChatBubble;
