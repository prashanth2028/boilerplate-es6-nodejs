import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    chat_name: {
        type: String,
        required: true
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
    },
    seen_by: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('Message', messageSchema)