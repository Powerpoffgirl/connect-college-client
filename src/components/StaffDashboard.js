/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const downloadResume = async (userId) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await fetch(`http://localhost:8003/history/downloadResume/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement('a');
          a.href = url;
          a.download = 'resume.pdf'; // Set the appropriate file name
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Error downloading resume');
        }
      } catch (error) {
        console.error('Error downloading resume:', error);
      }
    } else {
      console.warn('No access token available.');
    }
  };

  const fetchUserList = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await fetch('http://localhost:8003/auth/get_all_students', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserList(data.data);
        } else {
          console.error('Error fetching user list');
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    } else {
      console.warn('No access token available.');
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  console.log("USER LIST", userList)

  return (
    <div className='staff-dashboard'>
      <h2>Staff Dashboard</h2>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
      
      <div className='user-list'>
        {userList.map((user, index) => (
          <div key={index} className='user-item'>
            <div className='user-details'>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNo}</p>
            </div>
            <div className='resume-details'>
              <p>Resume Uploaded: {user.uploadDate}</p>
             <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  downloadResume(user.userId);
                }}
              >
              View Resume</a>
              <a href={user.downloadUrl} download>Download Resume</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
