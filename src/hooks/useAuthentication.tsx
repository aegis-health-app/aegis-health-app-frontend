import AsyncStorage from '@react-native-async-storage/async-storage';
export const useAuthentication = () => {
  const setToken = async (token: string) => {
    AsyncStorage.setItem('token', token);
  };
  const getToken = async () => {
    return AsyncStorage.getItem('token') ?? '';
  };
  return { setToken, getToken };
};
