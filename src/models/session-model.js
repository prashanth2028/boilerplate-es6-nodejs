import mongoose from 'mongoose';

// Define the session schema
const sessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    session_token: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Number,
        default: 1, 
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now, 
    }
});

sessionSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


export default mongoose.model('Session', sessionSchema);