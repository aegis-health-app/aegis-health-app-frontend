import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const useForgotPassword = () => {
  const { t } = useTranslation();

  const forgotPasswordSchema = Yup.object({
    newPassword: Yup.string()
      .required(t('changePassword.blankNewPasswordWarning'))
      .oneOf(
        [Yup.ref('repeatNewPassword'), null],
        t('changePassword.passwordsMustMatch')
      ),
    repeatNewPassword: Yup.string()
      .required(t('changePassword.blankNewPasswordWarning'))
      .oneOf(
        [Yup.ref('newPassword'), null],
        t('changePassword.passwordsMustMatch')
      )
  });

  return forgotPasswordSchema;
};
