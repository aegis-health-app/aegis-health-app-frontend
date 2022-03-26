import React, { useState, useEffect, createContext } from 'react';
import { client } from '../config/axiosConfig';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { useAuthentication } from '../hooks/useAuthentication';
import { User } from './../dto/modules/user.dto';

export interface UserContextProps {
  user: User | undefined;
  setUser: (value: User) => void;
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
    client
      .get<User>('/user')
      .then(({ data }) => {
        setUser(data as User);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    getUserProfile();
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
