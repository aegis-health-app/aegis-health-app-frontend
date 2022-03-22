import * as Yup from 'yup';

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Old Password cannot be left blank'),
  newPassword: Yup.string().required('Password cannot be left blank'),
  repeatNewPassword: Yup.string().required('Password cannot be left blank')
});
