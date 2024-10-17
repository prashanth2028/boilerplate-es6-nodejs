import socketController from "../controllers/socket-controller";

class privateChatMessage {

    async privateMessage (socket) {

        socket.on('chat', async(msg)=>{            
            const { name, receiverId, content } = msg
            const response = await socketController.saveonetoonemessage(name, socket.userId, receiverId, content)

            if (response) {
                socket.to(receiverId).emit('rechat', msg)
                console.log(msg)
            }
            else {
                socket.emit('error', 'message is in queue not sent to user')
            }
        });

    }
}

export default new privateChatMessage();