import * as Yup from 'yup';

export const phoneNumberVerificationCodeSchema = Yup.object({
  otp: Yup.string().required().length(6)
});
