import user_model from "../models/user_model";
import * as response from "../utlis/httputlis";


class subAdminControllers {

    async createSubAdmin (req,res){

        const { name, email, password, role} = req.body;

        try {
            let checkemail = await user_model.findOne({ email });
            if (checkemail) return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, "subadmin already exists");
        
            const user = await user_model.create({ name, email, password ,role});
            return response.successResponse(res, response.HttpStatus.CREATED, 'subAdmin created successfully', user);
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error registering user', error.message);
        }
    }

    async subAdminList (req,res){
        try {
            const subAdmin = await user_model.find({ role: 'subadmin' });
            return response.successResponse(res, response.HttpStatus.OK, 'subAdmin List', subAdmin);
            
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error on user list', error.message);
        }
    }


    async subAdminUpdate (req,res){
        try {
            const subAdmin = await user_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!subAdmin) {
                return response.errorResponse(res, response.HttpStatus.NOT_FOUND, 'subadmin not found');
            }
            return response.successResponse(res, response.HttpStatus.OK, 'subadmin updated successfully', subAdmin);
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error updating subadmin', error.message);
        }
    }


    async subAdminDelete (req,res){
        try {
            const subAdmin = await user_model.findByIdAndDelete(req.params.id);
            if (!subAdmin) {
                return response.errorResponse(res, response.HttpStatus.NOT_FOUND, 'subAdmin not found');
            }
            return response.successResponse(res, response.HttpStatus.OK, 'subAdmin deleted successfully');
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Error deleting subAdmin', error.message);
        }
    }
}

export default new subAdminControllers();