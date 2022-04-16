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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMywicm9sZSI6IkVsZGVybHkiLCJpYXQiOjE2NTAwOTIyODAsImV4cCI6MTY1MjY4NDI4MH0.IItB0jJ2jNj1xwf9dV6-ZPnmGTdR-IIP-MkPAj-TgQg';
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
