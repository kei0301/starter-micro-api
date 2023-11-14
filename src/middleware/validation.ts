import * as Joi from 'joi';
import * as Validation from 'express-joi-validation';
import { Request, Response, NextFunction } from 'express';

export const V = Validation.createValidator({ passError: true });

export const RetrunValidation = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error && error.error && error.value && error.type) {
    return res.status(400).json(error.error.toString().replace('Error: ', ''));
  } else {
    return next(error);
  }
};

export const Validator = {
  ObjectId: Joi.object({
    id: Joi.string().min(24).max(24).required()
  }),
  Id: Joi.object({
    id: Joi.string().required()
  }),
  Auth: {
    UserName: Joi.object({
      userName: Joi.string().required()
    }),
    Verify: Joi.object({
      userId: Joi.number().min(0).required(),
      phrase: Joi.array().required()
    }),
    Signup: Joi.object({
      type: Joi.string().valid('personal', 'agency').required(),
      user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        firstName: Joi.string().allow('', null).optional(),
        lastName: Joi.string().allow('', null).optional(),
        business_name: Joi.string().allow('', null).optional(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        cap: Joi.string().required(),
        tax_id: Joi.string().required(),
        p_iva: Joi.string().allow('', null).optional(),
        sdi: Joi.string().allow('', null).optional()
      })
    })
  }
};
