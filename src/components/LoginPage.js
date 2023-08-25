import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
// import { type } from '@testing-library/user-event/dist/type';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData ={
      email,
      password,
      userType,
    }

    try {
      console.log("EMAIL< PASSWORD, TYPE", email, password, userType)
        const response = await fetch('http://localhost:8003/login', {
        // mode:'no-cors', 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log("USER DATA AT AFTER LOGIN", data)

        const _id = data.user._id
        const token = data.token
        const user = data

        console.log("TOKEN", token)
        // Store the token in localStorage or secure storage
        localStorage.setItem('accessToken', token);
        localStorage.setItem("userId", _id);

        if (userType === 'student') {
          navigate('/studentDashboard', { state: { user } });
        } else if (userType === 'staff') {
          navigate('/staffDashboard');
        }
      } else {
        // Login failed
        const errorData = await response.json();
        console.error('Login error:', errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='container'>
      <div className='login-form'>
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='radio-group'>
            <label className='radio-label' htmlFor='student'>
              Student
            </label>
            <input
              type='radio'
              id='student'
              value='student'
              checked={userType === 'student'}
              onChange={() => setUserType('student')}
            />

            <label className='radio-label' htmlFor='staff'>
              Staff
            </label>
            <input
              type='radio'
              id='staff'
              value='staff'
              checked={userType === 'staff'}
              onChange={() => setUserType('staff')}
            />
          </div>

          <button type='submit'>Login</button>
        </form>

        <p>
          Not registered yet? <Link to='/'>Click here to register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
