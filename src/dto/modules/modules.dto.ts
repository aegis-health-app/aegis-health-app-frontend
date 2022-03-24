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

export interface ElderlyHomeProfile {
  uid: number;
  dname: string;
  imageid: string;
}
