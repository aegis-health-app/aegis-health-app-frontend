import React, { useContext, useState } from 'react';

import { createContext } from 'react';
import { client } from '../config/axiosConfig';
import {
  HealthRecording,
  HealthRecordingData
} from '../interfaces/healthRecording';
import { UserContext } from './UserContext';

export interface HealthRecordContextStruct {
  getHealthRecordTable: () => Promise<void>;
  healthTable: HealthRecordingData | undefined;
  setHealthTable: (value: HealthRecordingData | undefined) => void;
  currentElderlyUid: number | undefined;
  setCurrentElderlyUid: (val: number) => void;
  currentHrName: string | undefined;
  setCurrentHrName: (val: string) => void;
  currentHrImage: string | undefined;
  setCurrentHrImage: (val: string) => void;
  healthRecordTemplates: HealthRecording[];
  setHealthRecordTemplates: (value: HealthRecording[]) => void;
}

export const HealthRecordContext = createContext(
  {} as HealthRecordContextStruct
);

const HealthRecordProvider = ({ ...props }) => {
  const { user } = useContext(UserContext);

  const [healthTable, setHealthTable] = useState<HealthRecordingData>();
  const [currentElderlyUid, setCurrentElderlyUid] = useState<number>();
  const [currentHrName, setCurrentHrName] = useState<string>();
  const [currentHrImage, setCurrentHrImage] = useState<string>();
  const [healthRecordTemplates, setHealthRecordTemplates] = useState<
    HealthRecording[]
  >([]);

  const getHealthRecordTable = async () => {
    if (!user) return;

    // temp dummy hrName
    try {
      const tempHrName = currentHrName;
      const tempElderlyUid = currentElderlyUid;
      const { data } = await client.get(
        `healthRecord/table/${
          user.isElderly ? '' : `${tempElderlyUid}/`
        }${tempHrName}`
      );
      const _data = { ...data, data: data.data.reverse() };
      console.log(_data);
      setHealthTable(_data);
    } catch (error) {
      // TODO: Add error alert
      console.log(error);
    }
  };

  const value = {
    getHealthRecordTable,
    healthTable,
    setHealthTable,
    currentElderlyUid,
    setCurrentElderlyUid,
    currentHrName,
    setCurrentHrName,
    currentHrImage,
    setCurrentHrImage,
    healthRecordTemplates,
    setHealthRecordTemplates
  };
  return <HealthRecordContext.Provider value={value} {...props} />;
};

export default HealthRecordProvider;
