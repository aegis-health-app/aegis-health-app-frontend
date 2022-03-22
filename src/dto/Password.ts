import * as Yup from 'yup';

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Old Password cannot be left blank'),
  newPassword: Yup.string()
    .required('Password cannot be left blank')
    .oneOf([Yup.ref('repeatNewPassword'), null], 'Passwords must match')
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'New password cannot be the same as the old password'
    ),
  repeatNewPassword: Yup.string()
    .required('Password cannot be left blank')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'New password cannot be the same as the old password'
    )
});
