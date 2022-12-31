import axios from "axios";

const ican = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://icanezd-api.onrender.com",
});

ican.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { ican };
