  import React, { useState } from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useNavigate } from 'react-router-dom';
  import { handleSignup } from '../../api';
  import './SignUp.css';

  function SignUp() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      age: '',
      language: '',
      programmingExperience: '',
    });

    const navigate = useNavigate();

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
        const user = await handleSignup(formData);
        toast.success('Sign up successful');
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => navigate('/test'), 1000);
      } catch (error) {
        toast.error(error.message || 'Failed to sign up');
        console.error('Error during sign up:', error);
      }
    };

    return (
      <div className="sign-up-form">
        <h2>Sign Up</h2>
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

          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          >
            <option value="">Select Age Range</option>
            <option value="18-30">18-30</option>
            <option value="31-45">31-45</option>
            <option value="46-60">46-60</option>
            <option value="60+">60+</option>
          </select>

          <div className="radio-group">
            <p>Language Proficiency</p>
            <label>
              <input
                type="radio"
                name="language"
                value="yes"
                checked={formData.language === 'yes'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="language"
                value="no"
                checked={formData.language === 'no'}
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>

          <div className="radio-group">
            <p>Programming Experience</p>
            <label>
              <input
                type="radio"
                name="programmingExperience"
                value="yes"
                checked={formData.programmingExperience === 'yes'}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="programmingExperience"
                value="no"
                checked={formData.programmingExperience === 'no'}
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>

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
      </div>
    );
  }

  export default SignUp;
