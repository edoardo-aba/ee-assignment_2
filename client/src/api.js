import axios from 'axios';


export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });

    if (response.status === 200) {
      return response.data.user; // Return user data to the caller
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Login failed');
    } else {
      throw new Error(error.message || 'Error during login');
    }
  }
};

// Handle Signup
export const handleSignup = async (userData) => {
  try {
    const response = await axios.post('/api/signup', userData);

    if (response.status === 201) {
        return response.data.user; // Return user data to the caller
    } else {
      console.error('Signup failed:', response.data.error);
    }
  } catch (error) {
    if (error.response) {
      console.error('Signup failed:', error.response.data.error);
    } else {
      console.error('Error during signup:', error.message);
    }
  }
};

// Handle CSV Download
export const handleDownloadCsv = async () => {
  try {
    const response = await axios.get('/api/download-csv', {
      responseType: 'blob', // Ensure the response is handled as a binary blob
    });

    // Return the blob data to the caller
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Download failed:', error.response.data.error);
    } else {
      console.error('Error during download:', error.message);
    }
    throw error;
  }
};
