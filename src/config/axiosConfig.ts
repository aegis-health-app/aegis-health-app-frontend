import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export const client = Axios.create({
  baseURL: process.env.DEV_API_URL
});
client.interceptors.request.use(
  async (req) => {
    if (!req.headers?.Authorization) {
      const token = (await AsyncStorage.getItem('token')) ?? 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJyb2xlIjoiQ2FyZXRha2VyIiwiaWF0IjoxNjQ4MjI1ODMxLCJleHAiOjE2NDg4MzA2MzF9.lHR0SMB7tjGsMQTISm2iE19LeeX9osTBKqqUHeoq8Kk';
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => {
    console.log(error)
    console.log('hi')
    Promise.reject(error)}
);
