import Joi from 'joi-browser';

const registerSchema = {
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  confirmPassword: Joi.string().min(6).max(1024).required(),
};

export default registerSchema;
