import * as Yup from 'yup';
import i18n from '../internationalization/i18n.config';

export interface User {
  firstName?: string | undefined;
  lastName?: string | undefined;
  displayName?: string | undefined;
  birthGender?: string | undefined;
  birthDate?: string | undefined;
  phoneNumber?: string | undefined;
  healthIssues?: string | undefined;
  personalMedicine?: string | undefined;
  allergens?: string | undefined;
  previousVaccinations?: string | undefined;
  bloodType?: BloodType;
}

export type BloodType = 'N/A' | 'A' | 'B' | 'O' | 'AB' | string;

export const BirthGender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export const userProfileSchema = Yup.object({
  firstName: Yup.string().required(i18n.t('73')),
  lastName: Yup.string().required(i18n.t('74')),
  displayName: Yup.string().required(i18n.t('75')),
  birthGender: Yup.string(),
  birthDate: Yup.string(),
  healthIssues: Yup.string(),
  personalMedicine: Yup.string(),
  allergens: Yup.string(),
  previousVaccinations: Yup.string(),
  bloodType: Yup.string().oneOf(['N/A', 'A', 'B', 'O', 'AB'])
});
