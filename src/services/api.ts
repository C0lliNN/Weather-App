import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-weather-app.herokuapp.com/metaweather.com/api',
});

export default api;
