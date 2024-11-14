// src/components/Header/Header.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Import the external CSS file

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Set scrolled to true if scrolled > 50px
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <h1>¿who_is_the_best?</h1>
      <nav>
        <ul>
          {/* Replace <a> tags with <button> for navigation */}
          <li>
            <button onClick={() => navigate('/')}>home</button>
          </li>
          <li>
            <button onClick={() => navigate('/about')}>about</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
