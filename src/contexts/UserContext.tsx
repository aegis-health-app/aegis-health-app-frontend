import React, { useState, useEffect, createContext } from 'react';
import { User } from './../dto/modules/user.dto';

export interface UserContextProps {
  user: User | undefined;
  setUser: (value: User) => void;
  isElderly: boolean | undefined;
}

export const UserContext = createContext({} as UserContextProps);

const UserContextProvider = ({ ...props }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isElderly, setIsEldery] = useState<boolean>(false);

  useEffect(() => {
    // fetching user from back-end
  }, []);

  useEffect(() => {
    if (user?.isElderly === true) {
      setIsEldery(true);
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isElderly
  };
  return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
