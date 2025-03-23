// src/components/RoleCard.js
import React from 'react';

const RoleCard = ({ role, onSelect }) => {
  return (
    <div 
      className="card" 
      style={{ width: '150px', padding: '20px', cursor: 'pointer', textAlign: 'center' }}
      onClick={() => onSelect(role)}
    >
      <h3>{role}</h3>
      <p>Enter as {role}</p>
    </div>
  );
};

export default RoleCard;
