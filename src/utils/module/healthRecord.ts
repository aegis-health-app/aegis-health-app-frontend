import moment from 'moment';
import { HealthRecordData } from '../../interfaces/healthRecording';

export function getPeriodLable(data: HealthRecordData[]) {
  const LABEL_COUNT = 6;
  const interpolate = Math.ceil(data.length / LABEL_COUNT);
  const labels: string[] = [];

  data.forEach((val, index) => {
    if (index % interpolate === 0) {
      labels.push(moment(val.dateTime).format('DD/MM'));
    } else {
      return labels.push('');
    }
  });

  return labels;
}
