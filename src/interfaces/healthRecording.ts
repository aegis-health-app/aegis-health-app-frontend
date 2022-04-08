export interface HealthRecording {
  hrName: string;
  imageid: string;
  uid: number;
}
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
