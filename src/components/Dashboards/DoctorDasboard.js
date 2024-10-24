// src/components/Dashboard.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Welcome to the Doctor Dashboard!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DoctorDashboard;
