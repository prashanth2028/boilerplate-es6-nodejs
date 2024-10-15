import User from "../models/user_model";
import * as response from "../utlis/httputlis";


class AuthController {
    async register(req, res) {
        const { name, email, password, role } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, "User already exists");
        
            user = new User({ name, email, password, role });
            await user.save();
            return response.successResponse(res, response.HttpStatus.CREATED, 'User registered successfully', user);
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error registering user', error.message);
        }
    }
}

export default new AuthController();