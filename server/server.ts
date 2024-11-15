const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB with `users` as the database name
mongoose.connect('mongodb://localhost:27017/register');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to log the request type and request body
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log('Request Body:', req.body);
  next(); // Proceed to the next middleware or route handler
});

// Define Mongoose Schema with specific collection name
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: Number,
    gender: String,
    language: String,
    educationLevel: String,
    programmingExperience: Number,
    occupation: String,
  },
  { collection: 'users' }
);

// Define Mongoose Model
const User = mongoose.model('User', userSchema);

// Endpoint to handle signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, ...otherDetails } = req.body;

    const newUser = new User({ name, email, password, ...otherDetails });
    const savedUser = await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: savedUser._id, email: savedUser.email } 
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

// Endpoint to handle login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    console.log('User:', user);
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user._id, email: user.email } 
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Endpoint to handle submission of answers
app.post('/api/submit-answers', async (req, res) => {
  try {
    const { results } = req.body;

    // Process and save results to the database if necessary
    console.log('Received Results:', results);

    res.status(200).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
