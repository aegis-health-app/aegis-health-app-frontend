import * as Yup from 'yup';

export const phoneNumberVerificationCodeSchema = Yup.object({
<<<<<<< HEAD
  otp: Yup.string().required().length(6)
=======
  verificationCode: Yup.string().required('verificationCode').length(6)
>>>>>>> 6daae0e (wip:connect verification code to backend)
});
