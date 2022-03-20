export interface User {
  name?: string | undefined;
  dislpayName?: string | undefined;
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
