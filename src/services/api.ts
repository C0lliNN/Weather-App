import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-weather-by-meteosource.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'cdd4750d8amshc864cb9fa7b9e5bp11ffa2jsn3bc2042f9b45',
    'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
  }
});

export default api;
