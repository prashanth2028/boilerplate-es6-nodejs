import messageModel from "../models/message-model";



class socketController {

    async saveonetoonemessage (name, senderId, receiverID, content) {
        try {
            const messageDetails = {
                "chat_name": name,
                "sender_id": senderId,
                "receiver_id": receiverID,
                "content": content
            }
    
            const message = await new messageModel(messageDetails).save()
            console.log(message)
            return true
        }
        catch (error) {
            console.log(error.message)
            return false
        }

    }
}

export default new socketController();