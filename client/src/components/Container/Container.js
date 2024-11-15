import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import './Container.css';
import axios from 'axios';

// Mock data
const textArray = ["ciao come", "north south", "babilon manol"];
const cardDataArray = [
  ["ciao-come", "ciao-como", "come-ciao", "cociCome"],
  ["north-west", "south-north", "north-south", "west-north"],
  ["babilon", "manol", "babilonManol", "manol babilon"]
];
const correctAnswers = ["ciao-come", "north-south", "babilonManol"]; // Define correct answers

const Container = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current set of cards
  const [results, setResults] = useState(null); // Stores user's results
  const [finished, setFinished] = useState(false); // Tracks if the quiz is finished
  const [shuffledCards, setShuffledCards] = useState([]); // Tracks shuffled cards
  const [startTime, setStartTime] = useState(null); // Track quiz start time
  const [timeTaken, setTimeTaken] = useState(0); // Time taken to complete the task
  const navigate = useNavigate(); // For navigation

  // Shuffle array function
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Initialize results with user data and set the start time
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user
    if (user) {
      setResults({ userId: user.id, email: user.email, answers: [] }); // Add user data once
      setStartTime(Date.now()); // Set start time when the quiz begins
    }
  }, []);

  // Shuffle cards when currentIndex changes
  useEffect(() => {
    if (currentIndex < cardDataArray.length) {
      setShuffledCards(shuffleArray([...cardDataArray[currentIndex]]));
    }
  }, [currentIndex]);

  const handleCardClick = (value) => {
    const isCorrect = value === correctAnswers[currentIndex];

    setResults((prevResults) => {
      if (!prevResults) return prevResults; // Prevent updating if results are undefined
      const updatedAnswers = [
        ...prevResults.answers,
        { text: textArray[currentIndex], selected: value, correct: isCorrect },
      ];
      return { ...prevResults, answers: updatedAnswers };
    });

    // Move to the next set or mark as finished
    if (currentIndex < textArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const endTime = Date.now(); // Record end time
      setTimeTaken(((endTime - startTime) / 1000).toFixed(2)); // Calculate time in seconds
      setFinished(true); // Quiz finished
    }
  };

  useEffect(() => {
    if (finished && results) {
      const sendResults = async () => {
        try {
          const response = await axios.post('/api/submit-answers', {
            ...results,
            timeTaken, // Add timeTaken to the results sent to the server
          });

          if (response.status === 200) {
            console.log('Results submitted successfully');
          } else {
            console.error('Failed to submit results');
          }
        } catch (error) {
          console.error('Error submitting results:', error);
        }
      };

      sendResults();

      // Clear localStorage after results are submitted
      localStorage.removeItem('user'); // This clears the user's session or data
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to the home page
      }, 3000);
    }
  }, [finished, results, timeTaken]);

  if (finished) {
    // Render thank you message when the quiz is finished
    return (
      <div className="container">
        <h1 className="thank-you">Thank You!</h1>
        <p className="success-message">Your data has been collected successfully.</p>
        <p className="time-message">You completed the quiz in {timeTaken} seconds.</p>
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
