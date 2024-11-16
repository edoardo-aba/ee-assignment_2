const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createObjectCsvStringifier } = require('csv-writer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log('Request Body:', req.body);
  next();
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  language: String,
  educationLevel: String,
  programmingExperience: Number,
  occupation: String,
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

// Answer Schema and Model
const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  email: { type: String, required: true },
  answers: [
    {
      text: { type: String, required: true },
      selected: { type: String, required: true },
      correct: { type: Boolean, required: true },
    },
  ],
  timeTaken: { type: Number, required: true },
}, { collection: 'answers' });

const Answer = mongoose.model('Answer', answerSchema);

// Test route
app.get('/', (req, res) => {
  res.json('Hello, World!');
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, ...otherDetails } = req.body;

    const newUser = new User({ name, email, password, ...otherDetails });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: savedUser._id, email: savedUser.email },
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Submit answers endpoint
app.post('/api/submit-answers', async (req, res) => {
  try {
    const results = req.body;

    const newAnswer = new Answer(results);
    await newAnswer.save();

    res.status(200).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

// Download CSV endpoint
app.get('/api/download-csv', async (req, res) => {
  try {
    // Retrieve all answers
    const answers = await Answer.find().lean();

    // Fetch all users once to minimize database calls
    const users = await User.find().lean();

    // Create a map for quick access to user demographics by email
    const userMap = new Map(
      users.map(user => [
        user.email,
        {
          name: user.name,
          age: user.age,
          gender: user.gender,
          language: user.language,
          educationLevel: user.educationLevel,
          programmingExperience: user.programmingExperience,
          occupation: user.occupation,
        },
      ])
    );

    // Prepare records for CSV
    const records = answers.map(answer => {
      const user = userMap.get(answer.email) || {};
      return {
        email: answer.email,
        name: user.name || 'Unknown',
        age: user.age || 'N/A',
        gender: user.gender || 'N/A',
        language: user.language || 'N/A',
        educationLevel: user.educationLevel || 'N/A',
        programmingExperience: user.programmingExperience || 'N/A',
        occupation: user.occupation || 'N/A',
        timeTaken: answer.timeTaken,
        answers: JSON.stringify(answer.answers),
      };
    });

    // Define CSV header
    const header = [
      { id: 'email', title: 'Email' },
      { id: 'name', title: 'Name' },
      { id: 'age', title: 'Age' },
      { id: 'gender', title: 'Gender' },
      { id: 'language', title: 'Language' },
      { id: 'educationLevel', title: 'Education Level' },
      { id: 'programmingExperience', title: 'Programming Experience' },
      { id: 'occupation', title: 'Occupation' },
      { id: 'timeTaken', title: 'Time Taken' },
      { id: 'answers', title: 'Answers' },
    ];

    // Create CSV stringifier
    const csvStringifier = createObjectCsvStringifier({ header });

    // Generate CSV string
    const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);

    // Set the response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="answers.csv"');

    // Send the CSV data
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    res.status(500).json({ error: 'Failed to download CSV' });
  }
});

// Start server and bind to the port provided by Render or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
