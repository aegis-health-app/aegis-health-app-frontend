export enum ModuleEnum {
  emergency = 0, //default emergency
  reminder,
  healthRecords,
  memoryRecall,
  healthBlogs,
  moduleManage
}

export type ModuleId = 0 | 1 | 2 | 3 | 4 | 5;

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
  uid: number;
  dname: string;
  imageid: string;
}
