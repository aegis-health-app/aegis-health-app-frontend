import i18n from '../internationalization/i18n.config';

export interface AlertMessage {
  header: string;
  body: string;
  primaryButton: string;
  secondaryButton: string;
}

export const useAlertMessages = () => {
  const AlertMessages = {
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
    updateProfileError: {
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
    },
    changePhoneNumberSuccess: {
      header: i18n.t('changePhoneNumberSuccess.header'),
      body: i18n.t('changePhoneNumberSuccess.body'),
      primaryButton: i18n.t('changePhoneNumberSuccess.primaryButton'),
      secondaryButton: i18n.t('changePhoneNumberSuccess.secondaryButton')
    },
    changePhoneNumberError: {
      header: i18n.t('changePhoneNumberError.header'),
      body: i18n.t('changePhoneNumberError.body'),
      primaryButton: i18n.t('changePhoneNumberError.primaryButton'),
      secondaryButton: i18n.t('changePhoneNumberError.secondaryButton')
    },
    addHealthDataSuccess: {
      header: i18n.t('addHealthDataSuccess.header'),
      body: i18n.t('addHealthDataSuccess.body'),
      primaryButton: i18n.t('addHealthDataSuccess.primaryButton'),
      secondaryButton: i18n.t('addHealthDataSuccess.secondaryButton')
    },
    addHealthDataError: {
      header: i18n.t('addHealthDataError.header'),
      body: i18n.t('addHealthDataError.body'),
      primaryButton: i18n.t('addHealthDataError.primaryButton'),
      secondaryButton: i18n.t('addHealthDataError.secondaryButton')
    },
    duplicateHealthDataError: {
      header: i18n.t('duplicateHealthDataError.header'),
      body: i18n.t('duplicateHealthDataError.body'),
      primaryButton: i18n.t('duplicateHealthDataError.primaryButton'),
      secondaryButton: i18n.t('duplicateHealthDataError.secondaryButton')
    },
    confirmDeleteHealthRecordingAlert: {
      header: i18n.t('confirmDeleteHealthRecordingAlert.header'),
      body: i18n.t('confirmDeleteHealthRecordingAlert.body'),
      primaryButton: i18n.t('confirmDeleteHealthRecordingAlert.primaryButton'),
      secondaryButton: i18n.t(
        'confirmDeleteHealthRecordingAlert.secondaryButton'
      )
    },
    confirmDeleteHealthDataRowAlert: {
      header: i18n.t('confirmDeleteHealthDataRowAlert.header'),
      body: i18n.t('confirmDeleteHealthDataRowAlert.body'),
      primaryButton: i18n.t('confirmDeleteHealthDataRowAlert.primaryButton'),
      secondaryButton: i18n.t('confirmDeleteHealthDataRowAlert.secondaryButton')
    },
    deleteHealthRecordingError: {
      header: i18n.t('deleteHealthRecordingError.header'),
      body: i18n.t('deleteHealthRecordingError.body'),
      primaryButton: i18n.t('deleteHealthRecordingError.primaryButton'),
      secondaryButton: i18n.t('deleteHealthRecordingError.secondaryButton')
    },
    deleteHealthDataRowError: {
      header: i18n.t('deleteHealthDataRowError.header'),
      body: i18n.t('deleteHealthDataRowError.body'),
      primaryButton: i18n.t('deleteHealthDataRowError.primaryButton'),
      secondaryButton: i18n.t('deleteHealthDataRowError.secondaryButton')
    },
    updateHealthDataCoverImageSuccess: {
      header: i18n.t('updateHealthDataCoverImageSuccess.header'),
      body: i18n.t('updateHealthDataCoverImageSuccess.body'),
      primaryButton: i18n.t('updateHealthDataCoverImageSuccess.primaryButton'),
      secondaryButton: i18n.t(
        'updateHealthDataCoverImageSuccess.secondaryButton'
      )
    },
    updateHealthDataCoverImageError: {
      header: i18n.t('updateHealthDataCoverImageError.header'),
      body: i18n.t('updateHealthDataCoverImageError.body'),
      primaryButton: i18n.t('updateHealthDataCoverImageError.primaryButton'),
      secondaryButton: i18n.t('updateHealthDataCoverImageError.secondaryButton')
    },
    addCustomHealthRecordingSuccess: {
      header: i18n.t('addCustomHealthRecordingSuccess.header'),
      body: i18n.t('addCustomHealthRecordingSuccess.body'),
      primaryButton: i18n.t('addCustomHealthRecordingSuccess.primaryButton'),
      secondaryButton: i18n.t('addCustomHealthRecordingSuccess.secondaryButton')
    },
    addCustomHealthRecordingError: {
      header: i18n.t('addCustomHealthRecordingError.header'),
      body: i18n.t('addCustomHealthRecordingError.body'),
      primaryButton: i18n.t('addCustomHealthRecordingError.primaryButton'),
      secondaryButton: i18n.t('addCustomHealthRecordingError.secondaryButton')
    },
    emergencyNotification: {
      header: i18n.t('emergencyNotification.header'),
      body: i18n.t('emergencyNotification.body'),
      primaryButton: i18n.t('emergencyNotification.primaryButton'),
      secondaryButton: i18n.t('emergencyNotification.secondaryButton')
    }
  };
  return AlertMessages;
};
