import User from '../models/user-model';
import * as response from '../utlis/httputlis';
import { createSession } from '../utlis/createSession';
import sessionModel from '../models/session-model';
import sendMail from '../utlis/sendMail';


class AuthController {

    //register function
    async register(req, res) {
        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, "User already exists");
        
            user = new User({ name, email, password });
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

            
            const session = await createSession(data);

            delete data.password;
            
            if (user.role === 'user') {
                return response.successResponse(res, response.HttpStatus.OK, 'User logged in successfully', {
                    ...data._doc,
                    session_token: session.session_token
                });
            } else if (user.role === 'admin') {
                return response.successResponse(res, response.HttpStatus.OK, 'Admin logged in successfully', {
                    ...data._doc,
                    session_token: session.session_token
                });
            } else {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Invalid role');
            }

            
        } catch (error) {
            console.error('Error during login:', error);
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred during login', error.message);
        }
    }

    //logout function
    async logout(req, res) {
        try {
                const user = req.user; // User attached by the middleware
                const sessionToken = req.sessionToken;
        
                // Delete the session for both user and admin
                await sessionModel.deleteOne({ session_token: sessionToken });
        
                // Check the user's role and return different responses
                if (user.role === 'user') {
                    return response.successResponse(res, response.HttpStatus.OK, 'User logged out successfully');
                } else if (user.role === 'admin') {
                    return response.successResponse(res, response.HttpStatus.OK, 'Admin logged out successfully');
                } else {
                    return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Invalid role for logout');
                }
        } catch (err) {

            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred during logout', err.message);
        }
    }
}

export default new AuthController();