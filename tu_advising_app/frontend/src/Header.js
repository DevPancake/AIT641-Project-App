import React from "react";
import "./Styles/Header.css";

function Header() {
  return (
    <header className="header">
      <h1>Advising Portal</h1>
      <div className="header-right">
        <input type="text" placeholder="Search..." />
        <span role="img" aria-label="email">📧</span>
        <span role="img" aria-label="notification">🔔</span>
      </div>
    </header>
  );
}

export default Header;
