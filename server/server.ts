require('dotenv').config(); // Import dotenv and configure it
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();

// Enable CORS to allow requests from any origin
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
  methods: ['POST', 'GET', 'DELETE', 'PUT'], // Allowed HTTP methods
  credentials: true // Allow credentials to be sent
}));


// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB using the connection string from the .env file
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
});

// Middleware to log the request type and request body
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log('Request Body:', req.body);
  next(); // Proceed to the next middleware or route handler
});

// Define Mongoose Schema for users
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

const User = mongoose.model('User', userSchema);

// Define Mongoose Schema for answers
const answerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    email: { type: String, required: true },
    answers: [
      {
        text: { type: String, required: true },
        selected: { type: String, required: true },
        correct: { type: Boolean, required: true },
      },
    ],
    timeTaken: { type: Number, required: true }, // Store time taken in seconds
  },
  { collection: 'answers' } // Explicitly set the collection name
);

const Answer = mongoose.model('Answer', answerSchema);

// test route for vercel
app.get('/', (req, res) => {
  res.json('Hello, World!');
});


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
    const results = req.body;

    // Save results to the answers collection
    const newAnswer = new Answer(results);
    await newAnswer.save();

    console.log('Received Results:', results);

    res.status(200).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
});

// Start server and allow connections from any IP
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;