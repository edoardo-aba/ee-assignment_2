import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Introduction from './components/Introduction/Introduction';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/Login/LogIn';
import Container from './components/Container/Container';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for 'user' in localStorage
  const isLoggedIn = localStorage.getItem('user');

  // If not logged in, redirect to login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <Router>
        <Header /> {/* This will always be rendered, regardless of the route */}
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Container />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<div>About Page</div>} />
          {/* Catch-all route to redirect unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
