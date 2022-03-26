import React, { useState, createContext } from 'react';
import { getModuleList } from '../utils/module/manage';
import { getElderlyProfile } from '../utils/elderly/profile';
import { ElderlyHomeProfile, Module } from './../dto/modules/modules.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';

export interface ElderlyContextProps {
  elderlyProfile: ElderlyHomeProfile | undefined;
  setElderlyProfile: (val: ElderlyHomeProfile) => void;
  moduleList: Module[];
  setModuleList: (val: Module[]) => void;
}

export const ElderlyContext = createContext({} as ElderlyContextProps);

const ElderlyContextProvider = ({ ...props }) => {
  const [elderlyProfile, setElderlyProfile] = useState<ElderlyHomeProfile>();
  const [moduleList, setModuleList] = useState<Module[]>([]); // available modules and its name

  //If the user is elderly, get moduleIds and all available modules from the backend.
  //TODO: maybe check if the user is an elderly
  useAsyncEffect(async () => {
    const _elderlyProfile = await getElderlyProfile();

    if (_elderlyProfile.listModuleid) {
      _elderlyProfile.listModuleid = [0, ..._elderlyProfile?.listModuleid, 100];
      setElderlyProfile(_elderlyProfile);
    }

    const _moduleList = await getModuleList();

    _moduleList.unshift({ mname: 'Emergency', moduleid: 0 });
    _moduleList.push({ mname: 'Modules Manage', moduleid: 100 });
    setModuleList(_moduleList);
  }, []);

  const value = {
    elderlyProfile,
    setElderlyProfile,
    moduleList,
    setModuleList
  };

  return <ElderlyContext.Provider value={value} {...props} />;
};

export default ElderlyContextProvider;
