import moment from 'moment';
import { TimeFrame } from '../../constants/HealthRecordingConstants';
import { HealthRecordData } from '../../interfaces/healthRecording';

export function getPeriodLable(data: HealthRecordData[], timeFrame: TimeFrame) {
  const LABEL_COUNT = 6;
  const interpolate = Math.ceil(data.length / LABEL_COUNT);
  const labels: string[] = [];

  if (timeFrame === TimeFrame.YEAR || timeFrame === TimeFrame.ALL_TIME) {
    data.forEach((val, index) => {
      if (
        index === 0 ||
        index === data.length - 1 ||
        index === Math.round((data.length - 1) / 2)
      ) {
        labels.push(moment(val.dateTime).format('DD/MM/YY') + '        ');
      } else {
        return labels.push('');
      }
    });
    return labels;
  }
  data.forEach((val, index) => {
    if (index % interpolate === 0) {
      labels.push(moment(val.dateTime).format('DD/MM'));
    } else {
      return labels.push('');
    }
  });

  return labels;
}
