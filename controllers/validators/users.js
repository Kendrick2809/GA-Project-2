const Joi = require("joi");

const validators = {
  registerValidator: Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(4).required(),
    confirm_password: Joi.string().alphanum().min(4).required(),
  }),
};
module.exports = validators;
