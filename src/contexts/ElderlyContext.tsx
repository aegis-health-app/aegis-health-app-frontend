import React, { useState, createContext } from 'react';
import { getModuleList } from '../utils/module/manage';
import { getElderlyProfile } from '../utils/elderly/profile';
import { ElderlyHomeProfile, Module } from './../dto/modules/modules.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getElderlyCode } from '../utils/elderly/code';
import { getCaretakerList } from '../utils/elderly/caretakerList';
import { User } from '../dto/modules/user.dto';
import { ElderlyLinkCode } from '../dto/modules/code.dto';

export interface ElderlyContextProps {
  elderlyProfile: ElderlyHomeProfile | undefined;
  setElderlyProfile: (val: ElderlyHomeProfile) => void;
  moduleList: Module[];
  setModuleList: (val: Module[]) => void;
  elderlyCode: string;
  setElderlyCode: (val: string) => void;
  caretakerList: User[];
  setCaretakerList: (val: User[]) => void;
}

export const ElderlyContext = createContext({} as ElderlyContextProps);

const ElderlyContextProvider = ({ ...props }) => {
  const [elderlyProfile, setElderlyProfile] = useState<ElderlyHomeProfile>();
  const [moduleList, setModuleList] = useState<Module[]>([]); // available modules and its name
  const [elderlyCode, setElderlyCode] = useState<string>('');
  const [caretakerList, setCaretakerList] = useState<User[]>([]); // list all caretaker's data

  //If the user is elderly, get moduleIds and all available modules from the backend.
  useAsyncEffect(async () => {
    const _elderlyProfile = await getElderlyProfile();
    const _elderlyCode = await getElderlyCode();
    const _caretakerList = await getCaretakerList();

    setElderlyCode(_elderlyCode)
    setCaretakerList(_caretakerList)

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
    setModuleList,
    elderlyCode,
    setElderlyCode,
    caretakerList,
    setCaretakerList
  };

  return <ElderlyContext.Provider value={value} {...props} />;
};

export default ElderlyContextProvider;
