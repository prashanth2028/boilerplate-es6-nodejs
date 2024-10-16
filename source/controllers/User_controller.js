import user_model from "../models/user_model";
import * as response from "../utlis/httputlis";

class UserController {

    async userLisr (req,res){
        try {
            const users = await user_model.find({ role: 'user' });
            return response.successResponse(res, response.HttpStatus.OK, 'Users List', users);
            
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error on user list', error.message);
        }
    }

}

export default new UserController();