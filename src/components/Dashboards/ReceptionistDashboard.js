// src/components/ReceptionistDashboard.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';


const ReceptionistDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Welcome to the Receptionist Dashboard!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ReceptionistDashboard;
