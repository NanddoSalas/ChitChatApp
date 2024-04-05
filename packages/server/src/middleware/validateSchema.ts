import { AnyObjectSchema } from 'yup';
import { Middleware } from '../types';

export const validateSchema = (schema: AnyObjectSchema): Middleware => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });

      next();
    } catch (err) {
      const errors: any = {};

      err.inner.forEach((e: any) => {
        if (errors[e.path]) {
          errors[e.path].push(e.message);
        } else {
          errors[e.path] = [e.message];
        }
      });

      res.status(400).send(errors);
    }
  };
};
