import Joi from "joi";
import * as response from "../utlis/httputlis";

const subAdminCreate = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('subadmin').required() 
});

export const subAdminValidation = (req,res,next) => {
    try {
        const {error} = subAdminCreate.validate(req.body);
        if (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST,"Validation failed", { error: error.details[0].message })
        }
        next();
    } catch (error) {
      return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", { error: error.message });
    }
}