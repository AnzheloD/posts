import axios from "axios";

const typicodeApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default typicodeApi;
