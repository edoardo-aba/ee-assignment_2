import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { handleSignup } from '../../api'; // Import the API function
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    language: '',
    educationLevel: '',
    programmingExperience: '',
    occupation: '',
  });

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
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      const user = await handleSignup(formData); // Use the API utility function
      toast.success('Sign up successful');
      localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
      setTimeout(() => navigate('/test'), 1000); // Delay navigation by 1 second
    } catch (error) {
      toast.error(error.message || 'Failed to sign up');
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>

      {/* ToastContainer to render the toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          min="18"
          max="99"
          required
        />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>

        <input
          type="text"
          name="language"
          placeholder="Language (e.g., English)"
          value={formData.language}
          onChange={handleChange}
          required
        />

        <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} required>
          <option value="">Select Education Level</option>
          <option value="high_school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
        </select>

        <input
          type="number"
          name="programmingExperience"
          placeholder="Programming Experience (Years)"
          value={formData.programmingExperience}
          onChange={handleChange}
          min="0"
          max="50"
          required
        />

        <input
          type="text"
          name="occupation"
          placeholder="Occupation/Field of Study"
          value={formData.occupation}
          onChange={handleChange}
          required
        />

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

        <button type="submit" className="sign-up-button">Sign Up</button>
      </form>

      {/* Add the voice for login */}
      <div className="login-redirect">
        <p>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="login-link"
          >
            &nbsp;&nbsp;Log in here
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
