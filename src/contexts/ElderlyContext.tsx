import React, { useState, useEffect, createContext } from 'react';
import { Elderly } from '../dto/modules/user.dto';
import { Module } from './../dto/modules/modules.dto';

export interface ElderlyContextProps {
  elderlyHomeProfile: Elderly | undefined;
  setElderlyHomeProfile: (val: Elderly) => void;

  moduleList: Module[];
  setModuleList: (val: Module[]) => void;
}

export const ElderlyContext = createContext({} as ElderlyContextProps);

const ElderlyContextProvider = ({ ...props }) => {
  const [elderlyHomeProfile, setElderlyHomeProfile] = useState<Elderly>();
  const [moduleList, setModuleList] = useState<Module[]>([]);

  useEffect(() => {
    // if user is an elderly...
  }, []);

  const value = {
    elderlyHomeProfile,
    setElderlyHomeProfile,
    moduleList,
    setModuleList
  };

  return <ElderlyContext.Provider value={value} {...props} />;
};

export default ElderlyContextProvider;
