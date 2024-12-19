import axios from 'axios';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Login successful:', response.data);
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);  // Store token
    }
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Request was made and server responded
      if (error.response.status === 401) {
        throw new Error('Invalid credentials');
      } else if (error.response.status === 500) {
        throw new Error('Internal server error');
      } else {
        throw new Error('Unexpected error occurred');
      }
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('Network error. Please try again later.');
    } else {
      // Something happened in setting up the request
      throw new Error('Error setting up the login request');
    }
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Example Axios Interceptor for app-wide Authorization header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});