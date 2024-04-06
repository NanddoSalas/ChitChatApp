import { object, string } from 'yup';

export const registerSchema = object().shape({
  name: string().required(),
  email: string().required().email(),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  invitation: string().required(),
});
