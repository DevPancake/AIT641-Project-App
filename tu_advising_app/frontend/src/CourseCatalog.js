import React, { useState } from "react";
import "./Styles/CourseCatalog.css";

function CourseCatalog() {
  const [selectedTab, setSelectedTab] = useState("COSC");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="course-catalog">
      <h2>Course Catalog</h2>
      <div className="tabs">
        <button
          className={selectedTab === "COSC" ? "tab active" : "tab"}
          onClick={() => handleTabClick("COSC")}
        >
          COSC
        </button>
        <button
          className={selectedTab === "AIT" ? "tab active" : "tab"}
          onClick={() => handleTabClick("AIT")}
        >
          AIT
        </button>
        <button
          className={selectedTab === "IT" ? "tab active" : "tab"}
          onClick={() => handleTabClick("IT")}
        >
          IT
        </button>
      </div>

      <div className="level-selection">
        <h3>Select Your Academic Level</h3>
        <button className="level-button">Freshman</button>
        <button className="level-button">Sophomore</button>
        <button className="level-button">Junior</button>
        <button className="level-button">Senior</button>
      </div>

      <div className="content">
        <p>Showing courses for {selectedTab}</p>
        {/* Display course content based on selectedTab and academic level */}
      </div>
    </div>
  );
}

export default CourseCatalog;
