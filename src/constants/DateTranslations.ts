const dateTranslations = {
  Monday: 'วันจันทร์',
  Tuesday: 'วันอังคาร',
  Wednesday: 'วันพุธ',
  Thursday: 'วันพฤหัสบดี',
  Friday: 'วันศุกร์',
  Saturday: 'วันเสาร์',
  Sunday: 'วันอาทิตย์',
  January: 'มกราคม',
  February: 'กุมภาพันธ์',
  March: 'มีนาคม',
  April: 'เมษายน',
  May: 'พฤษภาคม',
  June: 'มิถุนายน',
  July: 'กรกฎาคม',
  August: 'สิงหาคม',
  September: 'กันยายน',
  October: 'ตุลาคม',
  November: 'พฤศจิกายน',
  December: 'ธันวาคม',
  ',': 'ที่'
};

const regex = new RegExp(Object.keys(dateTranslations).join('|'), 'gi');

export const translateDate = (str) => {
  str = str.replace(regex, (matched) => {
    return dateTranslations[matched];
  });
  return str;
};
