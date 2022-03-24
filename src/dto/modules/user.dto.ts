import { BloodType } from '../../interfaces/User';

export interface User {
  imageid: string;
  fname: string;
  lname: string;
  dname: string;
  bday: string;
  gender: string;
  isElderly: boolean;
  healthCondition: string | null;
  bloodType: BloodType;
  personalMedication: string | null;
  allergy: string | null;
  vaccine: string | null;
  phone: string;
  uid: number;
}
