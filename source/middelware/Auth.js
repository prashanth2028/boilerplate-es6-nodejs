import passport from 'passport';
import User from '../models/user_model';
import * as response from "../utlis/httputlis";
import sessionModel from '../models/session_model';

class CustomUserAuthStrategy extends passport.Strategy {
    async authenticate(req, options) {
        const token = req.headers.authorization;

        if (!token) {
            return this.fail('Missing authentication token', response.HttpStatus.UNAUTHORIZED);
        }

        const sessionToken = token.split(' ')[1];

        try {
            const result = await sessionModel.findOne({ session_token: sessionToken, status: 1 });

            if (!result) {
                return this.fail('Invalid session token', response.HttpStatus.UNAUTHORIZED);
            }

            const user = await User.findById(result.user_id);

            if (!user) {
                return this.fail('Access denied', response.HttpStatus.UNAUTHORIZED);
            }

            this.success(user);

        } catch (error) {
            return this.error('Internal server error', error);
        }
    }
}

const customUserAuthStrategy = new CustomUserAuthStrategy();

class UserAuthentication {
    constructor() {
        passport.use('user-custom', customUserAuthStrategy);
    }

    async check(req, res, next) {
        try {
            passport.authenticate('user-custom', { session: false }, (err, user) => {
                if (err) {
                    return response.errorResponse(res, response.HttpStatus.UNAUTHORIZED, 'Authentication failed', err.message);
                }
                if (!user) {
                    return response.errorResponse(res, response.HttpStatus.UNAUTHORIZED, 'Authentication failed', 'Unauthorized');
                }

                req.user = user;
                next();
            })(req, res, next);
        } catch (error) {
            return response.errorResponse(res, response.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error', error);
        }
    }
}

export default new UserAuthentication();