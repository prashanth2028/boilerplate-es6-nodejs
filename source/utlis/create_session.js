import { v4 as uuidv4 } from 'uuid'; 
import sessionModel from '../models/session_model'; 

export const createSession = async (data) => {
    try {
        const sessionToken = uuidv4();
        const userId = data._id || data.id; 

        const session = await sessionModel.findOneAndUpdate(
            { user_id: userId },
            {
                session_token: sessionToken,
                status: 1,
                updated_at: new Date(),
            },
            {
                new: true,
                upsert: true, 
                setDefaultsOnInsert: true,
            }
        );

        return session;
    } catch (error) {
        console.error('Error creating or updating session:', error);
        throw new Error('Failed to create or update session');
    }
};
