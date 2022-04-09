// import i18n from '../../internationalization/i18n.config';
// import moment from 'moment';
// import { HealthRecordData } from '../../interfaces/healthRecording';

// export function getPeriodLable(period: 'w' | '2w' | 'm' | '3m' | 'y') {
//   const MAX_LABEL_COUNT = 7;
//   const index = [0, 1, 2, 3, 4, 5, 6, 7];
//   const now = moment();
//   const labels = [];

//   if (period === 'w') {
//     return [
//       i18n.t('healthRecord.sun'),
//       i18n.t('healthRecord.mon'),
//       i18n.t('healthRecord.tue'),
//       i18n.t('healthRecord.wed'),
//       i18n.t('healthRecord.thu'),
//       i18n.t('healthRecord.fri'),
//       i18n.t('healthRecord.sat')
//     ];
//   } else if (period === '2w') {
//     const before = moment().subtract(2, 'weeks');
//     const interpolate = ""

//     index.forEach((each) => {
//       if (each === 0) {
//         labels.push(before.format('d/mm'));
//       } else {
//         const val = before.add(interpolate, 'days');
//         labels.push(val.format('d/mm'));
//       }
//     });
//   } else if (period === 'm') {
//   }
// }
