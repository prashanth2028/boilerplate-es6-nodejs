import bcrypt from 'bcryptjs';


export const decrypt = async (plainPassword, hashedPassword) => {    
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
};