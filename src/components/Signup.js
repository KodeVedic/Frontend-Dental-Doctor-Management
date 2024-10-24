import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const [isVerified, setIsVerified] = useState(false); // Track OTP verification status
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const navigate = useNavigate();

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    }
  }, [user, navigate]);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, { email, password });
      setOtpSent(true); // Move to OTP verification step
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-otp`, { email, otp });
      setIsVerified(true); // OTP verified
      navigate('/login'); // Redirect to login or dashboard after successful OTP verification
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  if (otpSent && !isVerified) {
    return (
      <div>
        <form onSubmit={handleOtpSubmit}>
          <h2>Verify OTP</h2>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled // Email is already submitted during signup, so it should be disabled here
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
