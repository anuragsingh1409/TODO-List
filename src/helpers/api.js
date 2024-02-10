import axios from "axios";

const url = "http://localhost:3000/todos";

const axiosInstance = axios.create({
  baseURL: url,
});

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(body) {
    return axiosInstance.post("", body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
};
