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
    // Note: must add Emergency module every time the data is received
    const data: Module[] = [
      { moduleid: 0, mname: 'Emergency' },
      {
        moduleid: 1,
        mname: 'Reminder'
      },
      {
        moduleid: 2,
        mname: 'Health Records'
      },
      {
        moduleid: 3,
        mname: 'Memory Recall'
      },
      {
        moduleid: 4,
        mname: 'Health Blogs'
      },
      {
        moduleid: 5,
        mname: 'Modules Manage'
      }
    ];

    setModuleList(data);
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
