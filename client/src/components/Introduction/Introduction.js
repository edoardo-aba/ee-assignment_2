import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleDownloadCsv } from '../../api';
import './Introduction.css';

function Introduction() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDownloadClick = async () => {
    try {
      const blob = await handleDownloadCsv(); // Call the function from api.js
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'answers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
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
        <button className="button download" onClick={handleDownloadClick}>Download .csv</button>
      </div>
    </div>
  );
}

export default Introduction;
