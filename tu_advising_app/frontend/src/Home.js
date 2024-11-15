import React from "react";
import "./Styles/Home.css";

function Home() {
  return (
    <div className="chatbox">
      <div className="chat-welcome">
        <p>
          Welcome to the Computer Science Advising Chat! 👋 I’m here to help you
          choose the right courses, answer questions about requirements, and
          guide you through program options, just like a human advisor would.
        </p>
        <p>
          You can:
          <ul>
            <li>Select a Topic from our list of common questions (e.g., course selection, prerequisites, graduation requirements).</li>
          </ul>
          Let’s make sure you’re set up for success this semester! 😊
        </p>
      </div>
      <input className="chat-input" type="text" placeholder="Start typing..." />
    </div>
  );
}

export default Home;
