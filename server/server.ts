// Import necessary modules
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();

// Enable CORS with specific configuration
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET'], // Allow only GET requests
}));

// Define a port
const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the online Express server!');
});

// Toy route 1: Hello route
app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// Toy route 2: Greet a user by name
app.get('/greet/:name', (req, res) => {
  const { name } = req.params;
  res.send(`Hello, ${name}!`);
});

// Toy route 3: Add two numbers
app.get('/add/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params;
  const sum = parseInt(num1) + parseInt(num2);
  res.send(`The sum of ${num1} and ${num2} is ${sum}.`);
});

// Start the server and allow connections from any IP
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and accessible on http://localhost:${PORT}`);
});

export default app;