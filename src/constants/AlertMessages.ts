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
  },
  updateProfileSuccess: {
    header: i18n.t('updateProfileSuccess.header'),
    body: i18n.t('updateProfileSuccess.body'),
    primaryButton: i18n.t('updateProfileSuccess.primaryButton'),
    secondaryButton: i18n.t('updateProfileSuccess.secondaryButton')
  },
  updateProileError: {
    header: i18n.t('updateProfileError.header'),
    body: i18n.t('updateProfileError.body'),
    primaryButton: i18n.t('updateProfileError.primaryButton'),
    secondaryButton: i18n.t('updateProfileError.secondaryButton')
  },
  uploadImageError: {
    header: i18n.t('uploadImageError.header'),
    body: i18n.t('uploadImageError.body'),
    primaryButton: i18n.t('uploadImageError.primaryButton'),
    secondaryButton: i18n.t('uploadImageError.secondaryButton')
  }
};
