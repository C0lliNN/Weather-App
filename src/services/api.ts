import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/metaweather.com/api',
});

export default api;
