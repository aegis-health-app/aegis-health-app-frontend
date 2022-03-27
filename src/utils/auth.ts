import { client } from '../config/axiosConfig';

export interface SignUpPayload {
  imageid: string;
  fname: string;
  lname: string;
  dname: string;
  bday: string;
  gender: string;
  isElderly: boolean;
  healthCondition: string;
  bloodType: string;
  personalMedication: string;
  allergy: string;
  vaccine: string;
  phone: string;
  password: string;
}

export const signUp = async (payload: SignUpPayload) =>
  await client.post('/user/signUp', payload);
