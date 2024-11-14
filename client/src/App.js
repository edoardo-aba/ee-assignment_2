import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Introduction from './components/Introduction/Introduction';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/Login/LogIn';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((err) => console.log(err));
  }, []); // Empty array to run only once

  return (
    <div>
      <Router>
        <Header /> {/* This will always be rendered, regardless of the route */}
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<div>About Page</div>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
