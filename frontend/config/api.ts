import axios from "axios";

const baseURL = "http://localhost:5198/api";

const api = axios.create({
  baseURL,
});

export default api;
