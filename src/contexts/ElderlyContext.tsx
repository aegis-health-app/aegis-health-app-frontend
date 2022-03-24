import React, { useState, useEffect, createContext } from 'react';
import { ElderlyHomeProfile, Module } from './../dto/modules/modules.dto';

export interface ElderlyContextProps {
  elderlyHomeProfile: ElderlyHomeProfile | undefined;
  setElderlyHomeProfile: (val: ElderlyHomeProfile) => void;

  moduleList: Module[];
  setModuleList: (val: Module[]) => void;
}

export const ElderlyContext = createContext({} as ElderlyContextProps);

const ElderlyContextProvider = ({ ...props }) => {
  const [elderlyHomeProfile, setElderlyHomeProfile] =
    useState<ElderlyHomeProfile>();
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
