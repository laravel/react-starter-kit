import axios, { AxiosRequestConfig } from 'axios';

const VITE_APP_API_URL = 'https://mock-data-api-nextjs.vercel.app/';
const axiosServices = axios.create({ baseURL: VITE_APP_API_URL || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    config.headers['Authorization'] =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTg2ODA5MjgzZTI4Yjk2ZDJkMzg1MzciLCJpYXQiOjE3NDM0MDMxMjEsImV4cCI6MTc0MzQ4OTUyMX0.hvqWYTc1NOylXAp0fA0LmRF6xlfeiCniIV5vjfGteg0';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServices;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });

  return res.data;
};
