import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';

function Introduction() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="introduction">
      <div class="introduction-text">
        <p>You are going to be tested!</p>
        <ul>
          <li>
            <strong>Purpose:</strong><br />
            We’re exploring if certain text formats (camelCase vs. kebab-case) affect reading speed for code.
          </li>
          <li>
            <strong>Task:</strong><br />
            You’ll see a simple phrase (e.g., “move south”) and then pick the matching identifier from a list using either camelCase or kebab-case.
          </li>
          <li>
            <strong>Instructions:</strong>
            Select the correct identifier as quickly and accurately as possible.
          </li>
          <li>
            <strong>Data Collection:</strong>
            We’ll record the time you take and whether you choose correctly to analyze overall reading speed.
          </li>
        </ul>
      </div>
      <div className="introduction-buttons">
        <button className="button signup" onClick={handleSignUpClick}>sign up</button>
        <button className="button login" onClick={handleLoginClick}>login</button>
      </div>
    </div>
  );
}

export default Introduction;
