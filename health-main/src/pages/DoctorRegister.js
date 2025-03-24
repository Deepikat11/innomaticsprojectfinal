//pages/PatientRegister
import React, { useState } from 'react';
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const DoctorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error message
    setError('');
    
    try {
      // Set loading state while request is in progress
      setLoading(true);
      
      // Log what we're sending (for debugging)
      console.log('Sending registration data:', formData);
      
      // Check if axios is available
      if (!axios) {
        console.error('Axios is not defined. Make sure you have installed it and imported it correctly.');
        setError('Internal error: API client not available');
        setLoading(false);
        return;
      }
      
      // Make API request to your backend
      // Use a more verbose approach for debugging
      console.log('Making API request to register endpoint');
      
      const response = await axios.post('https://innomaticsprojectfinal.onrender.com/api/v1/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Received response:', response);
      
      if (response.data.success) {
        // Registration successful, redirect to login
        alert('Registration successful! Please login.');
        navigate('/doctorlogin');
      } else {
        console.error('API returned success: false', response.data);
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Detailed error logging
      console.error('Registration error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.status === 409) {
          setError('Email already exists. Please use a different email or try logging in');
        } else {
          setError(error.response.data.message || 'Server error: ' + error.response.status);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Check your network connection and server status.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Temporary function for testing without backend
  const handleTestSubmit = (e) => {
    e.preventDefault();
    console.log('Test registration with:', formData);
    alert('Test registration successful! In a real app, you would be redirected to login.');
    navigate('/patientlogin');
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="card p-4">
        <h1 className="text-center">Register Form</h1>
        
        {/* Display error message if there is one */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
            disabled={loading}
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
            disabled={loading}
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
            disabled={loading}
          />
        </div>
        
        <Link to="/doctorlogin" className="ms-2">Already user login here</Link>
        <br />
        <button 
          className="btn btn-primary" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        
        {/* For testing only - you can remove this in production */}
        <div className="mt-3">
          <button 
            className="btn btn-secondary" 
            type="button"
            onClick={handleTestSubmit}
          >
            Test Register (No API)
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;