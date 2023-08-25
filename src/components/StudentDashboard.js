import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [phoneNo, setPhoneNo] = useState('');
  const [resume, setResume] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false); // New state for success message


  const handleResumeUpload = (e) => {
    const selectedFile = e.target.files[0];
    setResume(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('phoneNo', phoneNo);
    if (resume) {
      formData.append('resume', resume);
    }
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const response = await fetch('https://connect-college-server.onrender.com/auth/updateUser', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData, // Don't set Content-Type here, let the browser handle it
        });

        if (response.ok) {
          // Profile update successful
          setIsProfileUpdated(true); // Set the success state to true
        } else {
          // Profile update failed
          console.error('Profile update failed');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      console.warn("No access token available.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('phoneNo', phoneNo);
  //   if (resume) {
  //     formData.append('resume', resume);
  //   }
  //   const token = localStorage.getItem("accessToken");
  //   console.log("TOKEN CREATE BLOG CLIENT SIDE", token)

  //   if (token) {
  //   try {
  //     const response = await fetch('http://localhost:8003/auth/updateUser', {
  //       method: 'PUT',
  //       headers:{
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       // Profile update successful
  //       console.log('Profile updated successfully');
  //     } else {
  //       // Profile update failed
  //       console.error('Profile update failed');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }

  // } else {
  //   console.warn("No access token available.");
  // }
  // };

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
  
    if (token) {
      try {
        const response = await fetch('http://localhost:8003/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          // Logout successful
          console.log('Logged out successfully');
          navigate('/login');
          // You can perform additional tasks after logout if needed
        } else {
          // Logout failed
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
  
      // Clear the access token from local storage
      localStorage.removeItem('accessToken');
    } else {
      console.warn('No access token available.');
    }
  };
  
  // console.log("DATA", data)
  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    
      <div className="user-details">
        <p>
          Name:{location.state.user.user.name}
        </p>
        <p>
          Email:{location.state.user.user.email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='formContainer'>
        <span>
        <label htmlFor="phoneNo">Phone Number: </label>
        <input
          type="text"
          id="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        </span>
        <br/>
        <span>
          <label htmlFor="resume">Upload Resume: </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
          />
        </span>
        
        <br/>
        <button type="submit">Submit</button>
      </form>
      <div>
      {isProfileUpdated && <p className="success-message">Profile updated successfully!</p>}
      </div>
   </div>
  );
};

export default StudentDashboard;
