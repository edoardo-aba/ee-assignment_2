const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log('Request Body:', req.body);
  next();
});

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

app.get('/', (req, res) => {
  res.json('Hello, World!');
});

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

// Export the app for @vercel/node
module.exports = app;
