import i18n from '../internationalization/i18n.config';

export interface AlertMessage {
  header: string;
  body: string;
  primaryButton: string;
  secondaryButton: string;
}

export const AlertMessages = {
  changePasswordSuccess: {
    header: i18n.t('changePasswordSuccess.header'),
    body: i18n.t('changePasswordSuccess.body'),
    primaryButton: i18n.t('changePasswordSuccess.primaryButton'),
    secondaryButton: i18n.t('changePasswordSuccess.secondaryButton')
  },
  changePasswordError: {
    header: i18n.t('changePasswordError.header'),
    body: i18n.t('changePasswordError.body'),
    primaryButton: i18n.t('changePasswordError.primaryButton'),
    secondaryButton: i18n.t('changePasswordError.secondaryButton')
  }
};
