// Container.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import './Container.css';
import axios from 'axios';

// Extended mock data
const textArray = [
  "move south", "walk north", "jump high", "run fast", "climb mountain", "read book",
  "write code efficiently", "debug a program quickly", "build scalable applications",
  "optimize search algorithms", "design UI components", "test API endpoints"
];

const cardDataArray = [
  ["move-source", "move-south", "more-south", "mover-sound"],
  ["walkNose", "walkNorth", "walkNorthEast", "walkerNorth"],
  ["jump-hike", "jump-high", "jump-height", "jumper-high"],
  ["runForest", "runFast", "runnerFast", "runFaster"],
  ["climb-molehill", "climb-mountain", "climb-mountains", "climber-mountain"],
  ["readBooth", "readBook", "readerBook", "readingBooks"],
  ["write-code-efficient", "write-code-efficiently", "write-codes-efficiently", "writing-codes-efficiently"],
  ["debug-program-fast", "debug-program-quickly", "debug-a-program-quickly", "debugger-program-quickly"],
  ["build-scalable-app", "build-scalable-apps", "build-scalable-applications", "building-scalable-applications"],
  ["optimize-algo-search", "optimize-search-algo", "optimize-search-algorithms", "optimizer-search-algorithms"],
  ["design-UI-components", "design-UI-components-fast", "design-UI-component", "design-UI-compositions"],
  ["test-API-endpoint", "test-API-endpoints", "tester-API-endpoints", "test-the-API-endpoints"]
];

const correctAnswers = [
  "move-south", "walkNorth", "jump-high", "runFast", "climb-mountain", "readBook",
  "write-code-efficiently", "debug-a-program-quickly", "build-scalable-applications",
  "optimize-search-algorithms", "design-UI-components", "test-API-endpoints"
];

const kebabCaseIndices = [0, 2, 4, 6, 8, 10];

const Container = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState(null);
  const [finished, setFinished] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [taskStartTime, setTaskStartTime] = useState(null);
  const [shakeCard, setShakeCard] = useState(null);
  const [timeTakenCamelCase, setTimeTakenCamelCase] = useState(0);
  const [timeTakenKebabCase, setTimeTakenKebabCase] = useState(0);
  const [totalTime, setTotalTime] = useState(null); // Added for total time
  const navigate = useNavigate();

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setResults({ userId: user.id, email: user.email, answers: [] });
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    if (currentIndex < cardDataArray.length) {
      setShuffledCards(shuffleArray([...cardDataArray[currentIndex]]));
      setTaskStartTime(Date.now());
      setShakeCard(null); // Reset shake state on index change
    }
  }, [currentIndex]);

  const handleCardClick = (value) => {
    const isCorrect = value === correctAnswers[currentIndex];
    const taskEndTime = Date.now();
    const taskDuration = ((taskEndTime - taskStartTime) / 1000).toFixed(2);

    if (!isCorrect) {
      setShakeCard(value); // Trigger shake animation
      setTimeout(() => setShakeCard(null), 500); // Remove shake effect after 500ms
      return;
    }

    if (kebabCaseIndices.includes(currentIndex)) {
      setTimeTakenKebabCase((prev) => prev + parseFloat(taskDuration));
    } else {
      setTimeTakenCamelCase((prev) => prev + parseFloat(taskDuration));
    }

    setResults((prevResults) => {
      if (!prevResults) return prevResults;
      const updatedAnswers = [
        ...prevResults.answers,
        { 
          text: textArray[currentIndex], 
          selected: value, 
          correct: isCorrect,
          timeTaken: parseFloat(taskDuration), // Store time taken for this answer
        },
      ];
      return { ...prevResults, answers: updatedAnswers };
    });

    if (currentIndex < textArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeTakenKebabCase((prev) => prev.toFixed(2));
      setTimeTakenCamelCase((prev) => prev.toFixed(2));
      const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2); // Calculate total time
      setTotalTime(totalDuration);
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished && results) {
      const sendResults = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/submit-answers`, {
            userId: results.userId,
            email: results.email,
            timeTaken: {
              kebabCase: parseFloat(timeTakenKebabCase),
              camelCase: parseFloat(timeTakenCamelCase),
              total: parseFloat(totalTime), // Include total time
            },
            answers: results.answers, // Include individual answers with timeTaken
          });
      
          if (response.status === 200 || response.status === 201) {
            console.log('Results submitted successfully');
          } else {
            console.error('Failed to submit results');
          }
        } catch (error) {
          console.error('Error submitting results:', error);
        }
      };
      
      sendResults();
      localStorage.removeItem('user');
      setTimeout(() => navigate('/'), 8000);
    }
  }, [finished, results, timeTakenCamelCase, timeTakenKebabCase, totalTime, navigate]);

  if (finished) {
    return (
      <div className="container">
        <h1 className="thank-you">Thank You!</h1>
        <p>You took {totalTime} seconds in total.</p>
        <p>You took {timeTakenCamelCase} seconds for camelCase tasks and {timeTakenKebabCase} seconds for kebab-case tasks.</p>
        <p>Your data has been collected successfully. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="question">{textArray[currentIndex]}</h1>
      <div className="card-grid">
        {shuffledCards.map((value, index) => (
          <Card
            key={index}
            value={value}
            onClick={handleCardClick}
            shake={value === shakeCard}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
