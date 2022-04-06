import emotionCardImage from '../../assets/images/emotionCardImage';

export const getEmotionCardImage = (date: string, language: string) => {
  if (language === 'en') {
    switch (date) {
      case 'Monday':
        return emotionCardImage.MondayEn;
      case 'Tuesday':
        return emotionCardImage.TuesdayEn;
      case 'Wednesday':
        return emotionCardImage.WednesdayEn;
      case 'Thursday':
        return emotionCardImage.ThursdayEn;
      case 'Friday':
        return emotionCardImage.FridayEn;
      case 'Saturday':
        return emotionCardImage.SaturdayEn;
      default:
        return emotionCardImage.SundayEn;
    }
  } else {
    switch (date) {
      case 'Monday':
        return emotionCardImage.MondayTh;
      case 'Tuesday':
        return emotionCardImage.TuesdayTh;
      case 'Wednesday':
        return emotionCardImage.WednesdayTh;
      case 'Thursday':
        return emotionCardImage.ThursdayTh;
      case 'Friday':
        return emotionCardImage.FridayTh;
      case 'Saturday':
        return emotionCardImage.SaturdayTh;
      default:
        return emotionCardImage.SundayTh;
    }
  }
};
