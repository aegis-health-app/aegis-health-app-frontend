import { firebase } from '@react-native-firebase/messaging';
import React, { useState, useEffect, createContext, useCallback } from 'react';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { useAuthentication } from '../hooks/useAuthentication';
import { registerFCMToken } from '../utils/user/notification';
import { getUser } from '../utils/user/user';
import { User } from './../dto/modules/user.dto';

export interface UserContextProps {
  user: User | undefined;
  setUser: (value: User | undefined) => void;
  isElderly: boolean | undefined;
  userToken: string;
  getUserProfile: () => Promise<void>;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ ...props }) => {
  const { getToken } = useAuthentication();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isElderly, setIsElderly] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');

  const getUserProfile = async () => {
    const _user = await getUser();
    if (_user) {
      setUser(_user);
    }
    // for debug, remove later!
    console.log({ _user });
    console.log(userToken);
  };

  const registerForNotification = useCallback(async () => {
    const defaultAppMessaging = firebase.messaging();
    const FCMToken = await defaultAppMessaging.getToken();
    const result = await registerFCMToken(FCMToken);
  }, []);

  useEffect(() => {
    getUserProfile();
    registerForNotification();
  }, [userToken]);

  useEffect(() => {
    if (user?.isElderly === true) {
      setIsElderly(true);
    }
  }, [user]);

  useAsyncEffect(async () => {
    const _token = (await getToken()) ?? '';
    setUserToken(_token);
  }, [getToken, setUserToken]);

  const value = {
    user,
    setUser,
    isElderly,
    userToken,
    getUserProfile
  };
  return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
