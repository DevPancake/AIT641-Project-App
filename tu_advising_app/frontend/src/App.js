import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
//import ChatBox from "./ChatBox";
import Home from "./Home";
import CourseCatalog from "./CourseCatalog";
import "./Styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course-catalog" element={<CourseCatalog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

