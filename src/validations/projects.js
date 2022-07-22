import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(30).required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    description: Joi.string().min(3).max(200).required(),
    clientName: Joi.string().min(3).max(30).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    team: Joi.array().items(
      {
        employeeId: Joi.string().alphanum().length(24).required(),
        role: Joi.string().valid('QA', 'DEV', 'TL', 'PM', '-').required(),
        rate: Joi.number().precision(2).required(),
        isPM: Joi.boolean().optional(),
      },
    ),
    tasks: Joi.array(),
    isDeleted: Joi.boolean().optional(),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateModification = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(30).regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    description: Joi.string().min(3).max(200),
    clientName: Joi.string().min(3).max(30),
    startDate: Joi.date(),
    endDate: Joi.date(),
    team: Joi.array().items(
      {
        employeeId: Joi.string().alphanum().length(24),
        role: Joi.string().valid('QA', 'DEV', 'TL', 'PM', '-'),
        rate: Joi.number().precision(2),
        isPM: Joi.boolean().optional(),
      },
    ),
    tasks: Joi.array(),
    isDeleted: Joi.boolean().optional(),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateTeamAppend = (req, res, next) => {
  const teamMemberValidation = Joi.object({
    employeeId: Joi.string().alphanum().length(24).required(),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM', '-').required(),
    rate: Joi.number().precision(2).required(),
    isPM: Joi.boolean().optional(),
  });

  const validation = teamMemberValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

const validateTaskAppend = (req, res, next) => {
  const taskValidation = Joi.object({
    task: Joi.string().alphanum().length(24).required(),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: 'There has been an error in the validation',
      data: validation.error.details[0].message,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateModification,
  validateTeamAppend,
  validateTaskAppend,
};
