import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 5000,
});

AxiosInstance.interceptors.response.use(
  (response) => {
    console.log("API Response received:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.log("Unauthorized access");
      } else if (status === 404) {
        console.log("API not found");
      } else if (status === 500) {
        console.log("Server error");
      } else {
        console.log("API Error:", error.message);
      }
    } else if (error.request) {
      console.log("No response from server. Is JSON Server running?");
    } else {
      console.log("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;