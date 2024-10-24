import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './Dashboards/AdminDashboard';
import DoctorDashboard from './Dashboards/DoctorDasboard';
import ReceptionistDashboard from './Dashboards/ReceptionistDashboard';
import PatientDashboard from './Dashboards/PatientDashboard';
import UnknownDashboard from './UnknownDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if no user is logged in
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }
  {console.log("Dashboard- user info", user.email)}

  switch (user.role) {
    case 'admin':
      return <AdminDashboard/>;
    case 'doctor':
      return <DoctorDashboard/>;
    case 'receptionist':
      return <ReceptionistDashboard/>;
    case 'patient':
      return <PatientDashboard/>;
    default:
      return <UnknownDashboard/>;
  }
};

export default Dashboard;
