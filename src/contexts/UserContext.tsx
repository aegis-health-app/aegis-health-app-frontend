import React, { useState, createContext } from 'react';
import { User } from '../interfaces/User';

export interface UserContextStruct {
  userProfile: User | undefined;
  setUserProfile: (value: User) => void;
}

export const UserContext = createContext({} as UserContextStruct);

const UserContextProvider = ({ ...props }) => {
  const [userProfile, setUserProfile] = useState<User | undefined>(undefined);

  const value = {
    userProfile,
    setUserProfile
  };
  return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
