import axios from 'axios';

const API = axios.create({
  // Use your new live Render URL here
  baseURL: 'https://sankalp-farms.onrender.com/api', 
});

// This automatically attaches your JWT token to every request if it exists
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

  if (userInfo && userInfo.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export default API;