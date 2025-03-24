import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/RegisterStyles.css";
import axios from 'axios';

const PatientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Reset error message
    setError('');
    
    // Validate form data
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      // Set loading state while request is in progress
      setLoading(true);
      
      // Make API request to your backend
      const response = await axios.post('https://innomaticsprojectfinal.onrender.com/api/v1/user/login', {
        email,
        password
      });
      
      // Store token in localStorage for future API calls
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userType', 'patient');
        
        // Optional: Store user information
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Show success message (if you have a notification system)
        // toast.success('Login successful');
        
        // Navigate to patient home
        navigate('/patienthome');
      } else {
        setError(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          setError('Invalid email or password');
        } else if (error.response.status === 404) {
          setError('User not found. Please register first');
        } else {
          setError(error.response.data.message || 'Something went wrong');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection');
      } else {
        // Something happened in setting up the request
        setError('Error setting up request. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className='card p-4'>
        <h1 className='text-center'>Login Form</h1>
        
        {/* Display error message if there is one */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <Link to="/patientregister" className='ms-2'>Not a user Register here</Link>
        <br />
        <button 
          className='btn btn-primary' 
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default PatientLogin;