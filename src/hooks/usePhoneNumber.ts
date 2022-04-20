import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const usePhoneNumber = () => {
  const { t } = useTranslation();
  const changePhoneNumberSchema = Yup.object({
    phoneNumber: Yup.string()
      .required(t('changePhoneNumber.blankPhoneNumberWarning'))
      .length(10)
      .matches(
        /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/,
        t('changePhoneNumber.invalidPhoneNumberWarning')
      )
  });
  return changePhoneNumberSchema;
};
