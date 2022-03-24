import { BloodType } from '../../interfaces/User';

export enum ModuleEnum {
  reminder = 1,
  healthRecords,
  memoryRecall,
  healthBlogs
}

export type ModuleId = 1 | 2 | 3 | 4;

export interface Module {
  moduleid: ModuleId;
  mname: string;
}

export interface ElderlyUser {
  fname: string;
  lname: string;
  dname: string;
  gender: string;
  bday: string;
  bloodType: BloodType;
  healthCondition: string | null;
  personalMedication: string | null;
  allergy: string | null;
  vaccine: string | null;
  phone: string;
  listModuleid: ModuleId[];
}

export interface ElderlyHomeProfile {
  uid: number;
  dname: string;
  imageid: string;
}
