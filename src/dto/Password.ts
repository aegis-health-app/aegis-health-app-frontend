import * as Yup from 'yup';
import i18n from '../internationalization/i18n.config';

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required(
    i18n.t('changePassword.blankOldPasswordWarning')
  ),
  newPassword: Yup.string()
    .required(i18n.t('changePassword.blankNewPasswordWarning'))
    .oneOf(
      [Yup.ref('repeatNewPassword'), null],
      i18n.t('changePassword.passwordsMustMatch')
    )
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      i18n.t('changePassword.samePasswordWarning')
    ),
  repeatNewPassword: Yup.string()
    .required(i18n.t('changePassword.blankNewPasswordWarning'))
    .oneOf(
      [Yup.ref('newPassword'), null],
      i18n.t('changePassword.passwordsMustMatch')
    )
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      i18n.t('changePassword.samePasswordWarning')
    )
});
