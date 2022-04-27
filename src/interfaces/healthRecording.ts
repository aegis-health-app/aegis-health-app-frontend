export interface HealthRecording {
  hrName: string;
  imageid: string;
  uid?: number;
  params?: CustomHealthRecordingTemplate;
}
import { CustomHealthRecordingTemplate } from '../dto/modules/healthRecording.dto';
import { ImagePayload } from './image';

export interface HealthRecordingDataRow {
  dateTime: string;
  values: string[];
}

export interface HealthRecordingData {
  tableName: string;
  columnNames: string[];
  units: string[];
  data: HealthRecordingDataRow[];
}

export interface EditHealthRecordImage {
  hrName: string;
  image: ImagePayload;
}

export interface HealthRecordAnalytic {
  tableName: string;
  columnName: string;
  unit: string;
  analyticData: {
    mean: number;
    max: number;
    min: number;
  };
  data: HealthRecordData[];
}

export interface HealthRecordData {
  dateTime: string;
  value: number;
}
