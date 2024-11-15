import React from "react";
import { FaHome, FaBook, FaUser, FaComments, FaExchangeAlt, FaCog } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Styles/SideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>TU TOWSON UNIVERSITY</h2>
      <nav>
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/course-catalog"><FaBook /> Course Catalog</Link>
        <Link to="/profile"><FaUser /> My Profile</Link>
        <Link to="/advising"><FaComments /> Advising Help</Link>
        <Link to="/transfers"><FaExchangeAlt /> Transfers</Link>
        <Link to="/internships"><HiAcademicCap /> Internships</Link>
        <Link to="/settings"><FaCog /> Settings</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
