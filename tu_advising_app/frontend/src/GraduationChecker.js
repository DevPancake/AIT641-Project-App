import React, { useState, useEffect } from "react";
import "./Styles/GraduationChecker.css";
import { fetchData } from './fetch';

function GraduationChecker() {
  const [selectedTab, setSelectedTab] = useState("COMP");
  const [studentLevel, setStudentLevel] = useState('Undergraduate');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [graduationResult, setGraduationResult] = useState(null);

  const handleStudentLevelChange = (e) => {
    setStudentLevel(e.target.value);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleCourseSelection = (catalogNumber) => {
    setSelectedCourses((prev) => {
      if (prev.includes(catalogNumber)) {
        return prev.filter(course => course !== catalogNumber);
      } else {
        return [...prev, catalogNumber];
      }
    });
  };

  const handleFindCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData();
      let courseData = data.courses;
      if (courseData) {
        setCourses(courseData);
      } else {
        setError('No data found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGraduationCheck = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/graduation-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completedCourses: selectedCourses }),
      });
      const result = await response.json();
      setGraduationResult(result);
    } catch (error) {
      console.error('Error checking graduation status:', error);
    }
  };

  const sortedCourses = courses.sort((a, b) => a.catalogNumber - b.catalogNumber);

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
          COMP
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

      <div className="find-button-container">
        <button onClick={handleFindCourses} disabled={loading}>
          {loading ? 'Loading...' : 'Find Courses'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="filter-checkboxes">
        <h3>Select Courses</h3>
        {sortedCourses
          .filter(course => course.subject === selectedTab && course.career === studentLevel)
          .map((course) => (
            <div key={course.catalogNumber} className="checkbox-container">
              <input
                type="checkbox"
                id={course.catalogNumber}
                checked={selectedCourses.includes(course.catalogNumber)}
                onChange={() => handleCourseSelection(course.catalogNumber)}
              />
              <label htmlFor={course.catalogNumber}>
                <span className="title">{course.title}</span> COSC: {course.catalogNumber}
              </label>
            </div>
          ))}
      </div>

      <button className="check-graduation-button" onClick={handleGraduationCheck}>
        Check Graduation Eligibility
      </button>

      {graduationResult && (
        <div className="graduation-result">
          <h3>Graduation Eligibility Status</h3>
          <ul>
            <li>
                All core classes completed: <span className={graduationResult.hasAllCoreClasses ? 'green' : 'red'}>{graduationResult.hasAllCoreClasses ? 'Yes' : 'No'}</span>
            </li>
            <li>
                Capstone class completed: <span className={graduationResult.hasCapstoneClass ? 'green' : 'red'}>{graduationResult.hasCapstoneClass ? 'Yes' : 'No'}</span>
            </li>
            <li>
                Total credits earned: <span className={graduationResult.totalCredits >= 33 ? 'green' : 'red'}>{graduationResult.totalCredits}</span>
            </li>
          </ul>
          {graduationResult.eligibleForGraduation ? (
            <p><b>You are eligible for graduation! 🥳</b></p>
          ) : (
            <p>You are <b>not</b> eligible for graduation.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default GraduationChecker;
