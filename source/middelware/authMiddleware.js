import User from "../models/user_model";
import { decrypt } from "../utlis/crypto";
import * as response from "../utlis/httputlis";
import sessionModel from "../models/session_model";


class AuthMiddleware {
    // Middleware function as a method
    async checkCredentials(req, res, next) {
        try {
            const { email, password } = req.body;
            
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'No user exists with this email');
            }

            // Validate the password using your decryption utility
            const correctPassword = await decrypt(password, user.password);
            if (!correctPassword) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'Password is incorrect, please try again');
            }

            // Attach user to request object for further usage
            req.user = user;
            next(); 
        } catch (error) {
            console.error('Error during authentication:', error);
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Authentication error', error.message);
        }
    }

    async checkSessionToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const sessionToken = authHeader && authHeader.split(' ')[1]; 

            if (!sessionToken) {
                return response.errorResponse(res, response.HttpStatus.BAD_REQUEST, 'No session token provided');
            }

            // Check if session token exists in the session model
            const session = await sessionModel.findOne({ session_token: sessionToken });
            if (!session) {
                return response.errorResponse(res, response.HttpStatus.UNAUTHORIZED, 'Invalid session token or user is not logged in');
            }

            // Attach the session and user to the request object for the controller to use
            const user = await User.findById(session.user_id); // Assuming session stores the user ID
            if (!user) {
                return response.errorResponse(res, response.HttpStatus.UNAUTHORIZED, 'User not found');
            }

            req.user = user;
            req.sessionToken = sessionToken;
            next(); 
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Authentication error', error.message);
        }
    }
}

export default new AuthMiddleware();
