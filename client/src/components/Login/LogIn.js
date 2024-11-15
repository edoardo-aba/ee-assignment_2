// src/components/LogIn/LogIn.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../api'; // Import the API function
import './LogIn.css';

function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await handleLogin(formData.email, formData.password); // Call the API function
      toast.success('Login successful');
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage here
      navigate('/test'); // Redirect to /test on successful login
    } catch (error) {
      setError(error.message || 'Failed to log in');
      toast.error(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-in-form">
      <h2>Log In</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="log-in-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

     
    </div>
  );
}

export default LogIn;
