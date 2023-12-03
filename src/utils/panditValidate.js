const Joi = require("joi");
const { phone } = require("phone");
const xss = require("xss");

const schema = Joi.object({
  fullName: Joi.string().min(3).max(30).trim().required().messages({
    "string.min": "Full name should have a minimum length of {#limit}",
    "string.max": "Full name should have a maximum length of {#limit}",
    "string.empty": "Full name is not allowed to be empty",
    "any.required": "Full name is required",
  }),
  phoneNo: Joi.string().min(10).trim().max(15).required().messages({
    "string.min": "Mobile number should have a minimum length of {#limit}",
    "string.max": "Mobile number should have a maximum length of {#limit}",
    "string.empty": "Mobile number is not allowed to be empty",
    "any.required": "Mobile number is required",
  }),
  password: Joi.string().min(8).max(30).trim().required().messages({
    "string.min": "Password should have a minimum length of {#limit}",
    "string.max": "Password should have a maximum length of {#limit}",
    "string.empty": "Password is not allowed to be empty",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
});

let options = {
  whiteList: [],
};

function validateData(data) {
  let sanitizedData = {
    fullName: xss(data.fullName, options),
    phoneNo: xss(data.phoneNo, options),
    password: xss(data.password, options),
    confirmPassword: xss(data.confirmPassword, options),
  };
  let result = schema.validate(sanitizedData);
  if (result.error) {
    return {
      error: true,
      key: result.error.details[0].context.key,
      message: result.error.details[0].message,
    };
  } else {
    let isPhone = phone(data.phoneNo, { country: "IN" });
    if (isPhone.isValid === false) {
      return {
        error: true,
        key: "phoneNo",
        message: "Invalid mobile number",
      };
    } else {
      return { error: false, data: result.value };
    }
  }
}

module.exports = validateData;
