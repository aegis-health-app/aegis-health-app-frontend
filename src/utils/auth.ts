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

export interface SignInPayload {
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

export const signIn = async (phone: string, password: string) => {
  try {
    return await client.post('/user/login', { phone, password });
  } catch (e) {
    const error: { status: number } = e as { status: number };
    return { data: { status: error.status } };
  }
};

export const requestOTP = async (phone: string) =>
  await client.get(`/otp/request/${phone}`);

export const verifyOTP = async (token: string, otp: string) => {
  try {
    const payload = { token, pin: otp };
    return await client.post('/otp/verifyOtp', payload);
  } catch (e: any) {
    return { ...e };
  }
};

export const forgotPassword = async (phoneNo: string, newPassword: string) => {
  const payload = { phoneNo, newPassword };
  return await client.put('/user/forgotPassword', payload);
};

export const verifyPhone = async (phone: string) => {
  try {
    return await client.get(`/user/verifyPhoneNoExist/${phone}`);
  } catch (e: any) {
    return { ...e };
  }
};
