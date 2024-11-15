import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  language: String,
  educationLevel: String,
  programmingExperience: Number,
  occupation: String,
}, { collection: 'users' }); // Explicitly set the collection name

// Define Mongoose Model
const User = mongoose.model('User', userSchema);

// Endpoint to handle form data
app.post('/api/signup', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user data' });
  }
});


// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
