const Joi = require('Joi');

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    desc: Joi.string().max(100).required(),
    img: Joi.string().required(),
    category: Joi.string().required(),
    size: Joi.array().required(),
    color: Joi.string().required(),
    price: Joi.number().required(),
    inStock: Joi.boolean(),
  });

  return schema.validate(product);
}

module.exports = validateProduct;
