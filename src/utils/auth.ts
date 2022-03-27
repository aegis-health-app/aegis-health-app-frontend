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

export const requestOTP = async (phone: string) =>
  await client.get(`/otp/request/${phone}`);

export const verifyOTP = async (token: string, otp: string) =>
  await client.post('/otp/verifyOtp', { token, pin: otp });
