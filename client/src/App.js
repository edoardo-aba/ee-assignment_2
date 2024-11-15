import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Introduction from './components/Introduction/Introduction';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/Login/LogIn';
import Container from './components/Container/Container';

function App() {
  return (
    <div>
      <Router>
        <Header /> {/* This will always be rendered, regardless of the route */}
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/test" element={<Container />} />
          <Route path="/about" element={<div>About Page</div>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
