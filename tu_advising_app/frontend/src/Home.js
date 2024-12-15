import React from "react";
import "./Styles/Home.css";
import Towson from "./Images/brand-center-m.jpg";

function Home() {
  return (
    <div className="chatbox">
      <div className="chat-welcome">
        <p>
          Welcome to the TU Advising Application!
        </p>
        <img src={Towson} alt="Towson Image" className="logoImage" />
      </div>
    </div>
  );
}

export default Home;
