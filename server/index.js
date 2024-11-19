const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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

// Updated User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: String, enum: ['18-30', '31-45', '46-60', '60+'], required: true },
  language: { type: String, enum: ['yes', 'no'], required: true },
  programmingExperience: { type: String, enum: ['yes', 'no'], required: true },
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

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

// Start server and bind to the port provided by Render or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
