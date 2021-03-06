export enum ModuleEnum {
  emergency = 0, //default emergency
  reminder,
  healthRecords,
  memoryRecall,
  healthBlogs,
  moduleManage = 100
}

export type ModuleId = 0 | 1 | 2 | 3 | 4 | 5 | 100;

export interface Module {
  moduleid: ModuleId;
  mname:
    | 'Emergency'
    | 'Reminder'
    | 'Health Records'
    | 'Memory Recall'
    | 'Health Blogs'
    | 'Modules Manage';
}

export interface ElderlyHomeProfile {
  listModuleid: ModuleId[];
  dname: string;
  imageid: string;
}

export interface ElderlyLinkResponse {
  uid: number;
  imageid: string;
  fname: string;
  lname: string;
  dname: string;
}
