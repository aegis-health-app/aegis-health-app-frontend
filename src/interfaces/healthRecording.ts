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
