// src/components/Header/Header.js

import React, { useEffect, useState } from 'react';
import './Header.css'; // Import the external CSS file

function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      <h1>¿Who's the best?</h1>
      <nav>
        <ul>
          <li><a href="#home">HOME</a></li>
          <li><a href="#about">ABOUT</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
