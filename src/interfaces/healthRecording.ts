export interface HealthRecording {
  hrName: string;
  imageid: string;
  uid: number;
}

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
