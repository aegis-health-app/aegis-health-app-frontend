import React, { useState, createContext, useContext, useEffect } from 'react';
import { getModuleList } from '../utils/module/manage';
import { getElderlyProfile } from '../utils/elderly/profile';
import { ElderlyHomeProfile, Module } from './../dto/modules/modules.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { UserContext } from './UserContext';

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
  const { isElderly } = useContext(UserContext);

  React.useEffect(() => {
    console.log(elderlyProfile);
  }, [elderlyProfile]);

  //If the user is elderly, get moduleIds and all available modules from the backend.
  useAsyncEffect(async () => {
    // if (isElderly === false) {
    //   return;
    // }
    const _elderlyProfile = await getElderlyProfile();

    if (_elderlyProfile.listModuleid) {
      _elderlyProfile.listModuleid = [0, ..._elderlyProfile?.listModuleid, 100];
      setElderlyProfile(_elderlyProfile);
    }

    const _moduleList = await getModuleList();

    _moduleList.unshift({ mname: 'Emergency', moduleid: 0 });
    _moduleList.push({ mname: 'Modules Manage', moduleid: 100 });
    setModuleList(_moduleList);
  }, [isElderly]);

  const value = {
    elderlyProfile,
    setElderlyProfile,
    moduleList,
    setModuleList
  };

  return <ElderlyContext.Provider value={value} {...props} />;
};

export default ElderlyContextProvider;
