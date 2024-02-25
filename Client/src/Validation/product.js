import Joi from "joi";

const scheme = Joi.object({
  productName: Joi.string().min(5).max(50).required(),
  category: Joi.string().min(5).max(255).required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().min(5).required(),
  // image: Joi.object().required(),
});

export function validateProduct(product) {
  return scheme.validate(product);
}
