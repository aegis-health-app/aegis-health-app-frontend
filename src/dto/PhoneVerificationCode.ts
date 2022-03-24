import * as Yup from 'yup';

export const phoneNumberVerificationCodeSchema = Yup.object({
  verificationCode: Yup.string().required('verificationCode').length(10)
});
