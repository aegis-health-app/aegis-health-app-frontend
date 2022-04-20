import * as Yup from 'yup';
import i18n from '../internationalization/i18n.config';

export const phoneNumberVerificationCodeSchema = Yup.object({
  otp: Yup.string().required().length(6, i18n.t('changePhoneNumber.invalidOTP'))
});
