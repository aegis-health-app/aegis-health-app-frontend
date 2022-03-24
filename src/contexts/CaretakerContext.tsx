import React, { useState, useEffect, createContext } from 'react';
import { Caretaker, Elderly } from '../dto/modules/user.dto';

export interface CaretakerContextProps {
  caretakerHomeProfile: Caretaker | undefined;
  setCaretakerHomeProfile: (val: Caretaker) => void;

  elderlyList: Elderly[];
  setElderlyList: (val: Elderly[]) => void;
}

export const CaretakerContext = createContext({} as CaretakerContextProps);

const CaretakerContextProvider = ({ ...props }) => {
  const [caretakerHomeProfile, setCaretakerHomeProfile] = useState<Caretaker>();
  const [elderlyList, setElderlyList] = useState<Elderly[]>([]);

  useEffect(() => {
    // if user is an caretaker...
  }, []);

  const value = {
    caretakerHomeProfile,
    setCaretakerHomeProfile,
    elderlyList,
    setElderlyList
  };

  return <CaretakerContext.Provider value={value} {...props} />;
};

export default CaretakerContextProvider;
