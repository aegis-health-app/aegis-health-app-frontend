import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export const client = Axios.create({
  baseURL: process.env.DEV_API_URL
});
client.interceptors.request.use(
  async (req) => {
    if (!req.headers?.Authorization) {
      const token =
        (await AsyncStorage.getItem('token')) ??
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3LCJyb2xlIjoiQ2FyZXRha2VyIiwiaWF0IjoxNjQ5MDc3MjkzLCJleHAiOjE2NTE2NjkyOTN9.eHxRlPwHBMykZObmWTaUVeIraZ4YYrr71tS0CuL3dhA';
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
