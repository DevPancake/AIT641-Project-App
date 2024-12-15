import React from "react";
import { FaHome, FaBook, FaUser, FaComments, FaExchangeAlt, FaCog } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Styles/SideBar.css";
import Logo from '../src/Images/towson-university-logo.png';

function Sidebar() {
  return (
    <div className="SideBar">
      <img src={Logo} alt="Towson Logo" />
      <ul>
        <nav>
          <Link to="/"><FaHome /> Home</Link>
          <Link to="/course-catalog"><FaBook /> Course Catalog</Link>
          <Link to="/graduation"><FaUser /> Graduation Checker</Link>
          <Link to="/advising"><FaComments /> Advising Help</Link>
          <Link to="/transfers"><FaExchangeAlt /> Transfers</Link>
          <Link to="/internships"><HiAcademicCap /> Internships</Link>
          <Link to="/settings"><FaCog /> Settings</Link>
        </nav>
      </ul>
    </div>
  );
}

export default Sidebar;
