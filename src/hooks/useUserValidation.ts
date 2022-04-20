import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export type BloodType = 'N/A' | 'A' | 'B' | 'O' | 'AB' | string;

export interface ProfileItem {
  label: string;
  value: string | number | Date;
}

export const useUserValidation = () => {
  const { t } = useTranslation();

  const userProfileSchema = Yup.object({
    fname: Yup.string().required(t('editProfile.firstNameBlankWarning')),
    lname: Yup.string().required(t('editProfile.lastNameBlankWarning')),
    dname: Yup.string().required(t('editProfile.displayNameBlankWarning')),
    gender: Yup.string(),
    bday: Yup.string(),
    healthCondition: Yup.string(),
    personalMedication: Yup.string(),
    allergy: Yup.string(),
    vaccine: Yup.string(),
    phone: Yup.string().oneOf(['N/A', 'A', 'B', 'O', 'AB'])
  });
  return userProfileSchema;
};
