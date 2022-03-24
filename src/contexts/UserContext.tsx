import React, { useState } from 'react';

import { createContext } from 'react';
import { User } from '../interfaces/User';

export interface UserContextStruct {
  userProfile: User | undefined;
  setUserProfile: (value: User | undefined) => void;
}

export const UserContext = createContext({} as UserContextStruct);

const UserContextProvider = ({ ...props }) => {
  const [userProfile, setUserProfile] = useState<User | undefined>({
    name: '',
    displayName: '',
    birthGender: '',
    birthDate: '',
    phoneNumber: '',
    healthIssues: '',
    personalMedicine: '',
    allergens: '',
    previousVaccinations: '',
    bloodType: 'N/A'
  });

  const value = {
    userProfile,
    setUserProfile
  };
  return <UserContext.Provider value={value} {...props} />;
};

export default UserContextProvider;
