// src/components/Introduction/Introduction.js

import React from 'react';
import './Introduction.css';

function Introduction() {
  return (
    <div className="introduction">
      <div className="introduction-text">
        <p>You Are Going to Be Tested</p>
        <ul>
          <li><strong>Purpose:</strong> We’re exploring if certain text formats (camelCase vs. kebab-case) affect reading speed for code.</li>
          <li><strong>Task:</strong> You’ll see a simple phrase (e.g., “move south”) and then pick the matching identifier from a list using either camelCase or kebab-case.</li>
          <li><strong>Instructions:</strong> Select the correct identifier as quickly and accurately as possible.</li>
          <li><strong>Data Collection:</strong> We’ll record the time you take and whether you choose correctly to analyze overall reading speed.</li>
        </ul>
      </div>
      <div className="sidebar"></div>
      <div className="introduction-buttons">
        <button className="button signup">Sign Up</button>
        <button className="button login">Login</button>
      </div>
    </div>
  );
}

export default Introduction;
