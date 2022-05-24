import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/).required(),
    active: Joi.boolean().required(),
  });

  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email().lowercase(),
    password: Joi.string().regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
    active: Joi.boolean(),
  });

  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
