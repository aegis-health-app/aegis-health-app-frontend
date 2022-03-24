import { ModuleId } from './modules.dto';

export type BloodType = 'N/A' | 'A' | 'B' | 'O' | 'AB' | string;

export enum Gender {
  female = 'F',
  male = 'M'
}
export interface User {
  imageid: string;
  fname: string;
  lname: string;
  dname: string;
  bday: string;
  gender: 'F' | 'M';
  isElderly: boolean;
  uid: number;
}

export interface Caretaker extends User {
  listElderly: Elderly[];
}

export interface Elderly extends User {
  listModuleid: ModuleId[];
  healthCondition?: string | null;
  bloodType: BloodType;
  personalMedication?: string | null;
  allergy?: string | null;
  vaccine?: string | null;
  phone?: string;
}
