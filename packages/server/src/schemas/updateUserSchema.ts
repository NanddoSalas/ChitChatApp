import { object, string } from 'yup';

export const updateUserSchema = object().shape({
  name: string().required(),
  email: string().required().email(),
});
