const express= require('express')
const app = express()

const http=require('http')
const cors = require('cors')
const {Server}= require('socket.io')

app.use(cors())

const server=http.createServer(app)


const io= new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

    // Adding listeners
    io.on("connection",(socket)=>{
        console.log(`user with Id :${socket.id} connected`)

socket.on("disconnect",()=>{
    console.log(`user With ID: ${socket.id} logged out`)

})
// when person want to join our room, the data here is the room in the front end
socket.on("join-room",(data)=>{
    socket.join(data)
    console.log(`user with id ${socket.id} joined room :${data}`)
})
socket.on("send-message",(data)=>{
    console.log(data)
    //it is supposed to be socket.emit but because 
   // i want it pasted to just the room ,we use it socket.to(data.room)''
    socket.to(data.room).emit("recieve-message",data)
})

})

// socket.on("disconnected",(socket)=>{
//     console.log("user disconnected")
// })




server.listen(3001,()=>{
    console.log('server running')
})

