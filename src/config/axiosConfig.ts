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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUxLCJyb2xlIjoiRWxkZXJseSIsImlhdCI6MTY0ODMxMTQxMywiZXhwIjoxNjQ4OTE2MjEzfQ.An-AYuAEVkgraP3ozrc2sYchpNpfhrOu101Tg32bVRs';
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
