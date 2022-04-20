import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
export const usePassword = () => {
  const { t } = useTranslation();

  const changePasswordSchema = Yup.object({
    oldPassword: Yup.string().required(
      t('changePassword.blankOldPasswordWarning')
    ),
    newPassword: Yup.string()
      .required(t('changePassword.blankNewPasswordWarning'))
      .oneOf(
        [Yup.ref('repeatNewPassword'), null],
        t('changePassword.passwordsMustMatch')
      )
      .notOneOf(
        [Yup.ref('oldPassword'), null],
        t('changePassword.samePasswordWarning')
      ),
    repeatNewPassword: Yup.string()
      .required(t('changePassword.blankNewPasswordWarning'))
      .oneOf(
        [Yup.ref('newPassword'), null],
        t('changePassword.passwordsMustMatch')
      )
      .notOneOf(
        [Yup.ref('oldPassword'), null],
        t('changePassword.samePasswordWarning')
      )
  });

  return changePasswordSchema;
};
