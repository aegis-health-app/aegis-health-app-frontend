import * as Yup from 'yup';
import i18n from '../internationalization/i18n.config';

export type BloodType = 'N/A' | 'A' | 'B' | 'O' | 'AB' | string;

export const userProfileSchema = Yup.object({
  fname: Yup.string().required(i18n.t('editProfile.firstNameBlankWarning')),
  lname: Yup.string().required(i18n.t('editProfile.lastNameBlankWarning')),
  dname: Yup.string().required(i18n.t('editProfile.displayNameBlankWarning')),
  gender: Yup.string(),
  bday: Yup.string(),
  healthCondition: Yup.string(),
  personalMedication: Yup.string(),
  allergy: Yup.string(),
  vaccine: Yup.string(),
  phone: Yup.string().oneOf(['N/A', 'A', 'B', 'O', 'AB'])
});

export interface ProfileItem {
  label: string;
  value: string | number | Date;
}
