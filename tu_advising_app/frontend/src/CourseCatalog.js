import React, { useState, useEffect } from "react";
import "./Styles/CourseCatalog.css";
import { fetchData } from './fetch';

function CourseCatalog() {
  const [selectedTab, setSelectedTab] = useState("COSC");
  const [studentLevel, setStudentLevel] = useState('Undergraduate');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To handle any error during fetch

  // Function to handle student level change
  const handleStudentLevelChange = (e) => {
    setStudentLevel(e.target.value);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // Function to handle the "Find" button click and fetch data
  const handleFindCourses = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const data = await fetchData();
      if (data) {
        // Assuming the API returns courses data in a similar format to the local data
        console.log(data);
        setCourses(data); // Update the courses with API data
      } else {
        setError('No data found.');
      }
    } catch (err) {
      setError(err.message); // Set error message if something goes wrong
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const sortedCourses = courses.sort((a, b) => a.catalogNumber - b.catalogNumber) //Sorts the classes by number

  return (
    <div className="course-catalog">
      <h2>Course Catalog</h2>
      <div className="selection">
        <label htmlFor="studentLevel">Select Student Level:</label>
        <select id="studentLevel" value={studentLevel} onChange={handleStudentLevelChange}>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Graduate">Graduate</option>
        </select>
      </div>
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

      <div className="content">
        <p>Showing courses for {selectedTab} under {studentLevel}</p>
      </div>
      
      {/* Find button to trigger fetch request */}
      <div className="find-button-container">
        <button onClick={handleFindCourses} disabled={loading}>
          {loading ? 'Loading...' : 'Find Courses'}
        </button>
        {error && <div className="error">{error}</div>} {/* Show error if any */}
      </div>

      {/* Scrollable Course Catalog */}
      <div className="course-catalog-scroll">
        {sortedCourses.length > 0 ? (
          sortedCourses.map((course, index) => (
            course.subject == selectedTab && course.career == studentLevel ? (
              <div key={index} className="course-card">
                <h3>{course.title}</h3>
                <p><strong>Subject:</strong> {course.subject}</p>
                <p><strong>Catalog Number:</strong> {course.catalogNumber}</p>
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Units:</strong> {course.units}</p>
                <p><strong>Track:</strong> {course.track}</p>
                <p><strong>Prerequisite:</strong> {course.PrerequisiteClass}</p>
              </div>
            ) : null
          ))
        ) : (
          <p>Use the "Find Courses" button to search.</p>
        )}
      </div>
    </div>
  );
}

export default CourseCatalog;
