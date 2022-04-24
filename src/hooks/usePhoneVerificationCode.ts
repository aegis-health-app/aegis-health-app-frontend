import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const usePhoneVerificationCode = () => {
  const { t } = useTranslation();
  const phoneNumberVerificationCodeSchema = Yup.object({
    otp: Yup.string().required().length(6, t('changePhoneNumber.invalidOTP'))
  });

  return phoneNumberVerificationCodeSchema;
};
