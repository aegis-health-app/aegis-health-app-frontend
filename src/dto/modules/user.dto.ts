import { ModuleId } from './modules.dto';

export type BloodType = 'N/A' | 'A' | 'B' | 'O' | 'AB' | string;

export enum GenderEnum {
  female = 'F',
  male = 'M'
}

export type Gender = 'M' | 'F';

export interface User {
  imageid: string;
  fname: string;
  lname: string;
  dname: string;
  bday: string;
  gender: Gender;
  isElderly: boolean;
  uid: number;
  healthCondition?: string | null;
  bloodType: BloodType;
  personalMedication?: string | null;
  allergy?: string | null;
  vaccine?: string | null;
  phone?: string;
}

export interface Caretaker extends User {
  listElderly: Elderly[];
}

export interface Elderly extends User {
  listModuleid: ModuleId[];
}

export interface CaretakerInfoView {
    fullName: string;
    gender: 'F' | 'M';
    bdate: string;
    phone?: string;
    imageId: string;
    cid: number;
}
