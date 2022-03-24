import * as Yup from 'yup';

export const changePhoneNumberSchema = Yup.object({
  phoneNumber: Yup.string().required('phone').length(10)
});
