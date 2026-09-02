import AxiosInstance from "./AxiosInstance";

const ApiService = async (httpMethod, url, reqBody = {}) => {
  try {
    const response = await AxiosInstance({
      method: httpMethod,
      url,
      data: reqBody,
    });

    return response;
  } catch (error) {
    console.error("API Service Error:", error.response?.data || error.message);
    throw error;
  }
};

export default ApiService;