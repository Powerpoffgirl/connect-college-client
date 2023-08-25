import React, { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    // Prepare the data to send in the request body
    const userData = {
      name,
      email,
      password,
      userType,
    };

    console.log("USER DATA", userData)
    try {
      // Send a POST request to the registration API
      const response = await fetch('https://connect-college-server.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // Registration successful, you can handle redirection or display a success message
        console.log('Registration successful');
        navigate('/login'); // Navigate to login page
      } else {
        // Registration failed, handle error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='container'>
    <div className="registration-form">
      <h2>User Registration</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="radio-group">
            <label className="radio-label" htmlFor="student">
                Student
            </label>
            <input
                type="radio"
                id="student"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
            />
            
            <label className="radio-label" htmlFor="staff">
                Staff
            </label>
            <input
                type="radio"
                id="staff"
                value="staff"
                checked={userType === 'staff'}
                onChange={() => setUserType('staff')}
            />
            </div>

        <button type="submit">Register</button>
      </form>
        <p>
          Already registered? <Link to='/login'>Click here to login</Link>
        </p>
    </div>
    </div>
  );
};

export default RegisterPage;
