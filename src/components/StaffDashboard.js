/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const fetchCombinedData = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const usersResponse = await fetch('https://connect-college-server.onrender.com/auth/get_all_students', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const historyResponse = await fetch('https://connect-college-server.onrender.com/history/uploadHistory', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (usersResponse.ok && historyResponse.ok) {
          const usersData = await usersResponse.json();
          const historyData = await historyResponse.json();

          const combinedDataArray = usersData.data.map(user => {
            const historyItem = historyData.data.find(item => item.userId === user._id);
            return {
              name: user.name,
              email: user.email,
              phoneNo: user.phoneNo,
              uploadDate: historyItem ? historyItem.uploadDate : '',
              viewUrl: historyItem ? historyItem.viewUrl : '',
              downloadUrl: historyItem ? historyItem.downloadUrl : '',
            };
          });

          setCombinedData(combinedDataArray);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.warn('No access token available.');
    }
  };

  useEffect(() => {
    fetchCombinedData();
  }, []);

  return (
    <div className='staff-dashboard'>
      <h2>Staff Dashboard</h2>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
      
      <div className='user-list'>
        {combinedData.map((user, index) => (
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
                  // Handle view resume here
                }}
              >
                View Resume
              </a>
              <a href={user.downloadUrl} download={user.downloadUrl}>Download Resume</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;

