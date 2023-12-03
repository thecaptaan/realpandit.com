const Joi = require('joi');
const xss = require('xss');

// name, email, position, message

const schema = Joi.object({
    fullName: Joi.string().min(3).max(30).trim().required().messages({
        'string.min': 'Full name should have a minimum length of {#limit}',
        'string.max': 'Full name should have a maximum length of {#limit}',
        'string.empty': 'Full name is not allowed to be empty',
        'any.required': 'Full name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Invalid email',
        'string.empty': 'Email is not allowed to be empty',
        'any.required': 'Email is required'
    }),
    position: Joi.string().min(3).max(30).trim().required().messages({
        'string.min': 'Position should have a minimum length of {#limit}',
        'string.max': 'Position should have a maximum length of {#limit}',
        'string.empty': 'Position is not allowed to be empty',
        'any.required': 'Position is required'
    }),
    message: Joi.string().min(10).trim().required().messages({
        'string.min': 'Message should have a minimum length of {#limit}',
        'string.empty': 'Message is not allowed to be empty',
        'any.required': 'Message is required'
    })
})

let options = {
    whiteList: [],
}


function validateData(data){
    let sanitizedData = {
        fullName: xss(data.fullName,options),
        email: xss(data.email,options),
        position: xss(data.position,options),
        message: xss(data.message,options)
    }
    let result = schema.validate(sanitizedData)
    if(result.error){
        return { 
            error: true,
            key: result.error.details[0].context.key,
            message: result.error.details[0].message 
        }
    }else{
        return { error: false }
    }
}

module.exports = validateData;