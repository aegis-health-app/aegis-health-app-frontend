import React, { useState, createContext, useContext } from 'react';
import { getCaretakerHomeProfile } from '../utils/caretaker/profile';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { CaretakerHomeProfile } from './../dto/modules/caretaking.dto';
import { UserContext } from './UserContext';

export interface CaretakerContextProps {
  caretakerHomeProfile: CaretakerHomeProfile | undefined;
  setCaretakerHomeProfile: (val: CaretakerHomeProfile) => void;
}

export const CaretakerContext = createContext({} as CaretakerContextProps);

const CaretakerContextProvider = ({ ...props }) => {
  const [caretakerHomeProfile, setCaretakerHomeProfile] =
    useState<CaretakerHomeProfile>();

  const { user } = useContext(UserContext);

  useAsyncEffect(async () => {
    if (!user || user?.isElderly === true) return;

    const _caretakerHomeProfile = await getCaretakerHomeProfile();
    if (_caretakerHomeProfile) {
      setCaretakerHomeProfile(_caretakerHomeProfile);
    }
  }, []);

  const value = {
    caretakerHomeProfile,
    setCaretakerHomeProfile
  };

  return <CaretakerContext.Provider value={value} {...props} />;
};

export default CaretakerContextProvider;
