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
      {/* Added onClick to h1 */}
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        who's the best?
      </h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate('/')}>home</button>
          </li>
         
        </ul>
      </nav>
    </header>
  );
}

export default Header;
