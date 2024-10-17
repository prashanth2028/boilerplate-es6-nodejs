import privateChatSocket from "./private-chat-socket"


export const commonSocket = (io) => {
    io.use((socket, next) => {    
        const userId = socket.handshake.query.userId
        socket.userId = userId
        if (socket.userId) {
            next()
        }
        else {
            const err = new Error('userId is not defined')
            next(err)
        }
    })

    io.on('connection', (socket) => {
        socket.on('connect_error',()=>{
            console.log("somethink went wrong in connection"); 
        })
        socket.on('disconnect',()=>{
            console.log("connection is disconnected");
        })
       
        privateChatSocket.privateMessage(socket)

        console.log('socket-id:', socket.id , 'user-id:' ,socket.userId)
        console.log('connected successfully..!')
        socket.join(socket.userId)
    })
}