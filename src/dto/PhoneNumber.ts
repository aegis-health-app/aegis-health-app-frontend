import * as Yup from 'yup';
import i18n from '../internationalization/i18n.config';

export const changePhoneNumberSchema = Yup.object({
  phoneNumber: Yup.string()
    .required(i18n.t('changePhoneNumber.blankPhoneNumberWarning'))
    .length(10)
    .matches(
      /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/,
      i18n.t('changePhoneNumber.invalidPhoneNumberWarning')
    )
});
