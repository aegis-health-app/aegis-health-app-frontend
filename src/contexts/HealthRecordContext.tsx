import React, { useContext, useState } from 'react';

import { createContext } from 'react';
import { client } from '../config/axiosConfig';
import {
  HealthRecording,
  HealthRecordingData
} from '../interfaces/healthRecording';
import { CaretakerContext } from './CaretakerContext';
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
  myTemplates: HealthRecording[];
  setMyTemplates: (value: HealthRecording[]) => void;
  fetchHealthRecordings: () => Promise<void>;
}

export const HealthRecordContext = createContext(
  {} as HealthRecordContextStruct
);

const HealthRecordProvider = ({ ...props }) => {
  const { user } = useContext(UserContext);
  const { currentElderlyUid: elderlyUid } = useContext(CaretakerContext);

  const [healthTable, setHealthTable] = useState<HealthRecordingData>();
  const [currentElderlyUid, setCurrentElderlyUid] = useState<number>();
  const [currentHrName, setCurrentHrName] = useState<string>();
  const [currentHrImage, setCurrentHrImage] = useState<string>();
  const [healthRecordTemplates, setHealthRecordTemplates] = useState<
    HealthRecording[]
  >([]);
  const [myTemplates, setMyTemplates] = useState<HealthRecording[]>([]);

  const getHealthRecordTable = async () => {
    if (!user) return;

    const tempHrName = currentHrName;
    const tempElderlyUid = elderlyUid;
    const { data } = await client.get(
      `healthRecord/table${
        user.isElderly ? '/' : `/${tempElderlyUid}/`
      }${tempHrName}`
    );
    const _data = { ...data, data: data.data.reverse() };
    setHealthTable(_data);
  };

  const fetchHealthRecordings = async () => {
    if (user?.isElderly) {
      const res = await client.post('/healthRecord/getAll/elderly');
      setMyTemplates(res.data.listHealthRecord);
      setHealthRecordTemplates(res.data.listHealthRecord);
    } else {
      const payload = { elderlyuid: elderlyUid };
      const res = await client.post('/healthRecord/getAll/caretaker', payload);
      setMyTemplates(res.data.listHealthRecord);
      setHealthRecordTemplates(res.data.listHealthRecord);
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
    setHealthRecordTemplates,
    myTemplates,
    setMyTemplates,
    fetchHealthRecordings
  };
  return <HealthRecordContext.Provider value={value} {...props} />;
};

export default HealthRecordProvider;
