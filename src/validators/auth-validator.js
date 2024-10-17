import Joi from 'joi';
import * as response from '../utlis/httputlis';

const register = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export  const registerValidation = (req , res , next) => {
    try {
        const {error} = register.validate(req.body);
        if (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST,'Validation failed', { error: error.details[0].message })
        }
        next();
    } catch (error) {
      return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', { error: error.message });
    }
}

export const loginValidation = (req , res , next) => {
    try {
        const {error} = login.validate(req.body);
        if (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST,'Validation failed', { error: error.details[0].message })
        }
        next();
    } catch (error) {
      return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', { error: error.message });
    }
}