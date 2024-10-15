import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String,
        default: 'user' 
    }, // 'user' or 'admin'
}, 
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.pre('validate', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10); 
        }
        next(); 
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema);