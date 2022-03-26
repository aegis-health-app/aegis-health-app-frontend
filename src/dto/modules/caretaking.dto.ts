export interface ElderlyInCare {
  uid: number;
  dname: string;
  imageid: string;
}

export interface CaretakerHomeProfile {
  dname: string;
  imageid: string;
  listElderly: ElderlyInCare[];
}
