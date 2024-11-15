import React from 'react';
import './Card.css';

const Card = ({ value, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(value)}>
      {value}
    </div>
  );
};

export default Card;
