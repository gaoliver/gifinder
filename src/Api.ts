import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

api.defaults.params = {
  api_key: process.env.API_KEY,
};

export { api };
