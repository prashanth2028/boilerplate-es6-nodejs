import User from "../models/user_model";
import * as response from "../utlis/httputlis";
import { decrypt } from "../utlis/crypto";
import { createSession } from "../utlis/create_session";
import session_model from "../models/session_model";
import sendMail from "../utlis/sendMail";


class AuthController {

    //register function
    async register(req, res) {
        const { name, email, password, role } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, "User already exists");
        
            user = new User({ name, email, password, role });
            await user.save();

            if (user.role === "user"){
                const subject = 'Welcome to Our Platform!';
                const message = `Hi ${user.name}, Thank you for signing up!<br>`;
                const htmlContent = `<b>Hi ${user.name},</b><br><br>Thank you for signing up to our platform!<br><br>Best regards,`;
    
                // Send welcome email
                await sendMail(user.email, subject, message, htmlContent);     
            }
            
            return response.successResponse(res, response.HttpStatus.CREATED, 'User registered successfully', user);
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Error registering user', error.message);
        }
    }

    //login function
    async login (req,res) {
        try {
            const user = await User.findOne({email: req.body.email});

            const data = user;            

            if (!data) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'No user exists with this email');
            }
            const correctPassword = await decrypt(req.body.password, data.password)

            if(!correctPassword) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Password is incorrect, please try again');
            }
            
            const session = await createSession(data);

            delete data.password;

            return response.successResponse(res, response.HttpStatus.OK, 'User logged in successfully', {
                ...data._doc,
                session_token: session.session_token
            });
            
        } catch (error) {
            console.error('Error during login:', error);
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred during login', error.message);
        }
    }

    //logout function
    async logout(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            
            let sessionToken = authHeader && authHeader.split(' ')[1];            

            if (!sessionToken) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'No session token provided');
            }

            const session = await session_model.findOne({ session_token: sessionToken });

            if (!session) {
                return response.errorResponse(res, response.HttpStatus.UNAUTHORIZED, 'Invalid session token or user is not logged in');
            }

            session_model.deleteOne({ session_token: sessionToken });

            return response.successResponse(res, response.HttpStatus.OK, 'User logged out successfully');
        } catch (err) {

            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred during logout', err.message);
        }
    }
}

export default new AuthController();