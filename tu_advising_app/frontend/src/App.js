import React, { useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import ChatBubble from "./ChatBubble";
import Home from "./Home";
import CourseCatalog from "./CourseCatalog";
import "./Styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatIcon from "./Images/towson_tigers_logo_mascot.png";

function App() {
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [firstOpen, setFirstOpen] = useState(true);

  // Toggle chat bubble visibility
  const toggleChatBubble = () => {
    setShowChatBubble(true);
  };

  return (
    <Router>
      <div className="App">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <div className="header">
          <Header />
          </div>
          <div className="content">
            {/* Clickable image at the bottom-right corner */}
            {!showChatBubble && (
              <div className="clickable-image" onClick={toggleChatBubble}>
                <img src={ChatIcon} alt="Clickable Icon" />
              </div>
            )}
            {/* ChatBubble component */}
            {firstOpen && showChatBubble && (
              <ChatBubble
                setFirstOpen={setFirstOpen}
                isIntro={true}
                setShowChatBubble={setShowChatBubble}
              />
            )}
            {!firstOpen && showChatBubble && (
              <ChatBubble
                setFirstOpen={setFirstOpen}
                isIntro={false}
                setShowChatBubble={setShowChatBubble}
              />
            )}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course-catalog" element={<CourseCatalog />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
