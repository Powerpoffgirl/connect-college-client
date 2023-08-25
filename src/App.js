import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes for each page */}
          {/* <Route path="/homepage" element={<HomePage />} /> */}
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/studentDashboard' element={<StudentDashboard/>} />
          <Route path='/staffDashboard' element={<StaffDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
