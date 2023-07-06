import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SIMPLE_REST_URL
});
const AUTH_TOKEN = JSON.parse(localStorage.getItem('accessToken') || '');

instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

export default instance;