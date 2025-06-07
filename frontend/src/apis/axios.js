/* 
Axios is a promise-based HTTP client for the browser and Node.js.
It's used to send requests to and receive responses from APIs — just like fetch, but with extra features and simpler syntax.
*/

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5217/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



export default api;
