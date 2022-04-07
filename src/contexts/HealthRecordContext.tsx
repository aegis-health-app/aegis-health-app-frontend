import React, { useContext, useState } from 'react';

import { createContext } from 'react';
import { client } from '../config/axiosConfig';
import { HealthRecordingData } from '../interfaces/healthRecording';
import { UserContext } from './UserContext';

export interface HealthRecordContextStruct {
  getHealthRecordTable: () => Promise<void>;
  healthTable: HealthRecordingData | undefined;
  setHealthTable: (value: HealthRecordingData | undefined) => void;
}

export const HealthRecordContext = createContext(
  {} as HealthRecordContextStruct
);

const HealthRecordProvider = ({ ...props }) => {
  const { user } = useContext(UserContext);

  const [healthTable, setHealthTable] = useState<HealthRecordingData>();

  const getHealthRecordTable = async () => {
    if (!user) return;

    // temp dummy hrName
    try {
      const tempHrName = 'ความดัน';
      const tempElderlyUid = '2';
      const { data } = await client.get(
        `healthRecord/table/${
          user.isElderly ? '' : `${tempElderlyUid}/`
        }${tempHrName}`
      );
      const _data = { ...data, data: data.data.reverse() };
      setHealthTable(_data);
    } catch (error) {
      // TODO: Add error alert
      console.log(error);
    }
  };

  const value = {
    getHealthRecordTable,
    healthTable,
    setHealthTable
  };
  return <HealthRecordContext.Provider value={value} {...props} />;
};

export default HealthRecordProvider;
