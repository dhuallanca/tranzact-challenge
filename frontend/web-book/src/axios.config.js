import axios from 'axios';
const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'https://localhost:44389/api' });
export default instance;