import React from 'react';
import './Card.css';

const Card = ({ value, onClick, shake }) => {
  return (
    <div
      className={`card ${shake ? 'shake' : ''}`} // Add `shake` class if shake is true
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
};

export default Card;
