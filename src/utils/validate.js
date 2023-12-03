"use strict";
const Joi = require('joi')
const {phone} = require('phone')
const xss = require('xss')

const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).trim().required().messages({
        'string.min': 'First name should have a minimum length of {#limit}',
        'string.max': 'First name should have a maximum length of {#limit}',
        'string.empty': 'First name is not allowed to be empty',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().min(3).max(30).trim().required().messages({
        'string.min': 'Last name should have a minimum length of {#limit}',
        'string.max': 'Last name should have a maximum length of {#limit}',
        'string.empty': 'Last name is not allowed to be empty',
        'any.required': 'Last name is required'
    }),
    phoneNo: Joi.string().min(10).trim().max(15).required().messages({
        'string.min': 'Mobile number should have a minimum length of {#limit}',
        'string.max': 'Mobile number should have a maximum length of {#limit}',
        'string.empty': 'Mobile number is not allowed to be empty',
        'any.required': 'Mobile number is required'
    }),
    password: Joi.string().min(8).max(30).trim().required().messages({
        'string.min': 'Password should have a minimum length of {#limit}',
        'string.max': 'Password should have a maximum length of {#limit}',
        'string.empty': 'Password is not allowed to be empty',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": "Confirm password must match password"
    })
})

let options = {
    whiteList: [],
}
function validateData(data){
    let sanitizedData = {
        firstName: xss(data.firstName,options),
        lastName: xss(data.lastName,options),
        phoneNo: xss(data.phoneNo,options),
        password: xss(data.password,options),
        confirmPassword: xss(data.confirmPassword,options)
    }
    let result = schema.validate(sanitizedData)
    if(result.error){
        return { 
            error: true,
            key: result.error.details[0].context.key,
            message: result.error.details[0].message 
        }
    }else{
        let isPhone = phone(data.phoneNo, {country: 'IN'});
        if (isPhone.isValid === false){
            return { 
                error: true,
                key: "phoneNo",
                message: "Invalid mobile number"
            }
        }
        else{
            return {
                error: false,
                value: result.value 
            }
        }
    }
}


module.exports = validateData