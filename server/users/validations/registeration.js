const Joi = require('Joi');

function validateRegistration(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

module.exports = validateRegistration;
