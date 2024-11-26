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
        <div className="introduction-text">
          <p>You are going to be tested!</p>
          <ul>
            <li>
              <strong>Purpose:</strong><br />
              We’re exploring whether certain text formats, like camelCase and kebab-case, affect reading speed and accuracy.
            </li>
            <li>
              <strong>What are camelCase and kebab-case?:</strong><br />
              - <strong>camelCase:</strong> Words are written together without spaces. The first word is lowercase, and each subsequent word starts with an uppercase letter (e.g., "moveSouth").<br />
              - <strong>kebab-case:</strong> Words are written in lowercase and separated by hyphens (e.g., "move-south").
            </li>
            <li>
              <strong>Task:</strong><br />
              You’ll see a simple phrase (e.g., "move south") and need to select the correct matching format from the given 4 options.
            </li>
            <li>
              <strong>Instructions:</strong><br />
              Click the correct format (camelCase or kebab-case) as quickly and accurately as possible.
            </li>
            <li>
              <strong>Data Collection:</strong><br />
              We’ll record the time you take and whether you choose correctly to analyze overall reading speed and accuracy.
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
