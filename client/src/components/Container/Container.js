import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import './Container.css';

// Mock data
const textArray = ["ciao come", "north south", "babilon manol"];
const cardDataArray = [
  ["ciao-come", "ciao-como", "come-ciao", "cociCome"],
  ["north-west", "south-north", "north-south", "west-north"],
  ["babilon", "manol", "babilon manol", "manol babilon"]
];
const correctAnswers = ["ciao-come", "north-south", "babilon manol"]; // Define correct answers

const Container = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current set of cards
  const [results, setResults] = useState([]); // Stores user's results
  const [finished, setFinished] = useState(false); // Tracks if the quiz is finished
  const [shuffledCards, setShuffledCards] = useState([]); // Tracks shuffled cards
  const navigate = useNavigate(); // For navigation

  // Shuffle array function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Shuffle cards when currentIndex changes
  useEffect(() => {
    if (currentIndex < cardDataArray.length) {
      setShuffledCards(shuffleArray([...cardDataArray[currentIndex]]));
    }
  }, [currentIndex]);

  const handleCardClick = (value) => {
    const isCorrect = value === correctAnswers[currentIndex];
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user

    const updatedResults = [
      ...results,
      { 
        text: textArray[currentIndex], 
        selected: value, 
        correct: isCorrect, 
        userId: user.id // Associate answer with user
      }
    ];

    setResults(updatedResults);

    // Move to the next set or mark as finished
    if (currentIndex < textArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true); // Quiz finished
      console.log('Results:', updatedResults);
    }
  };

  // Send results to the backend when finished
  useEffect(() => {
    if (finished) {
      const sendResults = async () => {
        try {
          const response = await fetch('/api/submit-answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ results }),
          });

          if (response.ok) {
            console.log('Results submitted successfully');
          } else {
            console.error('Failed to submit results');
          }
        } catch (error) {
          console.error('Error submitting results:', error);
        }
      };

      sendResults();
    }
  }, [finished, results]);

  if (finished) {
    // Render thank you message when the quiz is finished
    return (
      <div className="container">
        <h1 className="thank-you">Thank You!</h1>
        <p className="success-message">Your data has been collected successfully.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Dynamic text */}
      <h1 className="question">{textArray[currentIndex]}</h1>

      {/* Cards */}
      <div className="card-grid">
        {shuffledCards.map((value, index) => (
          <Card key={index} value={value} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Container;
