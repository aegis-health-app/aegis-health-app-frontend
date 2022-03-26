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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJyb2xlIjoiQ2FyZXRha2VyIiwiaWF0IjoxNjQ4MjM5MTkxLCJleHAiOjE2NDg4NDM5OTF9.KQtL4bc5WYvX8HIwi3_poILyhetouRqPllx6DgzrVmY';
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
