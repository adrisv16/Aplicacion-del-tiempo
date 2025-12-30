import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    
    appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'es'
  }
});

export default weatherApi;
