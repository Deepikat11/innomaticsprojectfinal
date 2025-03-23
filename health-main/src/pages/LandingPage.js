import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#e8f0fe' 
    }}>
      <h1 style={{ marginBottom: '40px', fontSize: '24px', fontWeight: 'bold', color: '#4B5563' }}>
        Welcome to Doctor Appointment System
      </h1>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/patientlogin')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl py-6 px-10 transition duration-300 ease-in-out shadow-lg"
        >
          Patient Portal
        </button>
        <button
          onClick={() => navigate('/doctorlogin')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl py-6 px-10 transition duration-300 ease-in-out shadow-lg"
        >
          Doctor Portal
        </button>
      </div>
    </div>
  );
};

export default LandingPage;