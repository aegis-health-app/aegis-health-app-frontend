import { useTranslation } from 'react-i18next';

export interface AlertMessage {
  header: string;
  body: string;
  primaryButton: string;
  secondaryButton: string;
}

export const useAlertMessages = () => {
  const { t } = useTranslation();

  const AlertMessages = {
    changePasswordSuccess: {
      header: t('changePasswordSuccess.header'),
      body: t('changePasswordSuccess.body'),
      primaryButton: t('changePasswordSuccess.primaryButton'),
      secondaryButton: t('changePasswordSuccess.secondaryButton')
    },
    changePasswordError: {
      header: t('changePasswordError.header'),
      body: t('changePasswordError.body'),
      primaryButton: t('changePasswordError.primaryButton'),
      secondaryButton: t('changePasswordError.secondaryButton')
    },
    updateProfileSuccess: {
      header: t('updateProfileSuccess.header'),
      body: t('updateProfileSuccess.body'),
      primaryButton: t('updateProfileSuccess.primaryButton'),
      secondaryButton: t('updateProfileSuccess.secondaryButton')
    },
    updateProfileError: {
      header: t('updateProfileError.header'),
      body: t('updateProfileError.body'),
      primaryButton: t('updateProfileError.primaryButton'),
      secondaryButton: t('updateProfileError.secondaryButton')
    },
    uploadImageError: {
      header: t('uploadImageError.header'),
      body: t('uploadImageError.body'),
      primaryButton: t('uploadImageError.primaryButton'),
      secondaryButton: t('uploadImageError.secondaryButton')
    },
    uploadImageLimitError: {
      header: t('uploadImageLimitError.header'),
      body: t('uploadImageLimitError.body'),
      primaryButton: t('uploadImageLimitError.primaryButton'),
      secondaryButton: t('uploadImageLimitError.secondaryButton')
    },
    changePhoneNumberSuccess: {
      header: t('changePhoneNumberSuccess.header'),
      body: t('changePhoneNumberSuccess.body'),
      primaryButton: t('changePhoneNumberSuccess.primaryButton'),
      secondaryButton: t('changePhoneNumberSuccess.secondaryButton')
    },
    changePhoneNumberError: {
      header: t('changePhoneNumberError.header'),
      body: t('changePhoneNumberError.body'),
      primaryButton: t('changePhoneNumberError.primaryButton'),
      secondaryButton: t('changePhoneNumberError.secondaryButton')
    },
    addHealthDataSuccess: {
      header: t('addHealthDataSuccess.header'),
      body: t('addHealthDataSuccess.body'),
      primaryButton: t('addHealthDataSuccess.primaryButton'),
      secondaryButton: t('addHealthDataSuccess.secondaryButton')
    },
    addHealthDataError: {
      header: t('addHealthDataError.header'),
      body: t('addHealthDataError.body'),
      primaryButton: t('addHealthDataError.primaryButton'),
      secondaryButton: t('addHealthDataError.secondaryButton')
    },
    duplicateHealthDataError: {
      header: t('duplicateHealthDataError.header'),
      body: t('duplicateHealthDataError.body'),
      primaryButton: t('duplicateHealthDataError.primaryButton'),
      secondaryButton: t('duplicateHealthDataError.secondaryButton')
    },
    confirmDeleteHealthRecordingAlert: {
      header: t('confirmDeleteHealthRecordingAlert.header'),
      body: t('confirmDeleteHealthRecordingAlert.body'),
      primaryButton: t('confirmDeleteHealthRecordingAlert.primaryButton'),
      secondaryButton: t('confirmDeleteHealthRecordingAlert.secondaryButton')
    },
    confirmDeleteHealthDataRowAlert: {
      header: t('confirmDeleteHealthDataRowAlert.header'),
      body: t('confirmDeleteHealthDataRowAlert.body'),
      primaryButton: t('confirmDeleteHealthDataRowAlert.primaryButton'),
      secondaryButton: t('confirmDeleteHealthDataRowAlert.secondaryButton')
    },
    deleteHealthRecordingError: {
      header: t('deleteHealthRecordingError.header'),
      body: t('deleteHealthRecordingError.body'),
      primaryButton: t('deleteHealthRecordingError.primaryButton'),
      secondaryButton: t('deleteHealthRecordingError.secondaryButton')
    },
    deleteHealthDataRowError: {
      header: t('deleteHealthDataRowError.header'),
      body: t('deleteHealthDataRowError.body'),
      primaryButton: t('deleteHealthDataRowError.primaryButton'),
      secondaryButton: t('deleteHealthDataRowError.secondaryButton')
    },
    updateHealthDataCoverImageSuccess: {
      header: t('updateHealthDataCoverImageSuccess.header'),
      body: t('updateHealthDataCoverImageSuccess.body'),
      primaryButton: t('updateHealthDataCoverImageSuccess.primaryButton'),
      secondaryButton: t('updateHealthDataCoverImageSuccess.secondaryButton')
    },
    updateHealthDataCoverImageError: {
      header: t('updateHealthDataCoverImageError.header'),
      body: t('updateHealthDataCoverImageError.body'),
      primaryButton: t('updateHealthDataCoverImageError.primaryButton'),
      secondaryButton: t('updateHealthDataCoverImageError.secondaryButton')
    },
    addCustomHealthRecordingSuccess: {
      header: t('addCustomHealthRecordingSuccess.header'),
      body: t('addCustomHealthRecordingSuccess.body'),
      primaryButton: t('addCustomHealthRecordingSuccess.primaryButton'),
      secondaryButton: t('addCustomHealthRecordingSuccess.secondaryButton')
    },
    addCustomHealthRecordingError: {
      header: t('addCustomHealthRecordingError.header'),
      body: t('addCustomHealthRecordingError.body'),
      primaryButton: t('addCustomHealthRecordingError.primaryButton'),
      secondaryButton: t('addCustomHealthRecordingError.secondaryButton')
    },
    emergencyNotification: {
      header: t('emergencyNotification.header'),
      body: t('emergencyNotification.body'),
      primaryButton: t('emergencyNotification.primaryButton'),
      secondaryButton: t('emergencyNotification.secondaryButton')
    },
    connectElderlySuccess: {
      header: t('connectElderlySuccess.header'),
      body: t('connectElderlySuccess.body'),
      primaryButton: t('connectElderlySuccess.primaryButton'),
      secondaryButton: t('connectElderlySuccess.secondaryButton')
    },
    connectElderlyError: {
      header: t('connectElderlyError.header'),
      body: t('connectElderlyError.body'),
      primaryButton: t('connectElderlyError.primaryButton'),
      secondaryButton: t('connectElderlyError.secondaryButton')
    },
    createReminderSuccess: {
      header: t('createReminderSuccess.header'),
      body: t('createReminderSuccess.body'),
      primaryButton: t('createReminderSuccess.primaryButton'),
      secondaryButton: t('createReminderSuccess.secondaryButton')
    },
    createReminderError: {
      header: t('createReminderError.header'),
      body: t('createReminderError.body'),
      primaryButton: t('createReminderError.primaryButton'),
      secondaryButton: t('createReminderError.secondaryButton')
    },
    reminderInvalidStartingDateError: {
      header: t('reminderInvalidStartingDateError.header'),
      body: t('reminderInvalidStartingDateError.body'),
      primaryButton: t('reminderInvalidStartingDateError.primaryButton'),
      secondaryButton: t('reminderInvalidStartingDateError.secondaryButton')
    },
    reminderUploadImageError: {
      header: t('reminderUploadImageError.header'),
      body: t('reminderUploadImageError.body'),
      primaryButton: t('reminderUploadImageError.primaryButton'),
      secondaryButton: t('reminderUploadImageError.secondaryButton')
    },
    updateReminderSuccess: {
      header: t('updateReminderSuccess.header'),
      body: t('upateReminderSuccess.body'),
      primaryButton: t('updateReminderSuccess.primaryButton'),
      secondaryButton: t('updateReminderSuccess.secondaryButton')
    },
    updateReminderError: {
      header: t('updateReminderError.header'),
      body: t('updateReminderError.body'),
      primaryButton: t('updateReminderError.primaryButton'),
      secondaryButton: t('updateReminderError.secondaryButton')
    },
    deleteReminderSuccess: {
      header: t('deleteReminderSuccess.header'),
      body: t('deleteReminderSuccess.body'),
      primaryButton: t('deleteReminderSuccess.primaryButton'),
      secondaryButton: t('deeleteReminderSuccess.secondaryButton')
    },
    deleteReminderError: {
      header: t('deleteReminderError.header'),
      body: t('deleteReminderError.body'),
      primaryButton: t('deleteReminderError.primaryButton'),
      secondaryButton: t('deeleteReminderError.secondaryButton')
    },
    deleteMemoryRecall: {
      header: t('deleteMemoryRecall.header'),
      body: t('deleteMemoryRecall.body'),
      primaryButton: t('deleteMemoryRecall.primaryButton'),
      secondaryButton: t('deleteMemoryRecall.secondaryButton')
    }
  };
  return AlertMessages;
};
