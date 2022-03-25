import React, { useState, useEffect, createContext } from 'react';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { useAuthentication } from '../hooks/useAuthentication';
import { User } from './../dto/modules/user.dto';

export interface UserContextProps {
  user: User | undefined;
  setUser: (value: User) => void;
  isElderly: boolean | undefined;
  userToken: string;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ ...props }) => {
  const { getToken } = useAuthentication();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isElderly, setIsEldery] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');

  useEffect(() => {
    // fetching user from back-end
  }, []);

  useEffect(() => {
    if (user?.isElderly === true) {
      setIsEldery(true);
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
    userToken
  };
  return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
