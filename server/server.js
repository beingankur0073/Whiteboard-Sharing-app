import express from 'express'
import http from 'http';
import { Server} from 'socket.io';

const app=express();

// Create the HTTP server
const server = http.createServer(app);
// Attach Socket.io to the server
const io = new Server(server);


// routes
app.get("/",(req,res)=>{
    res.send("This is mern realtime board sharing app official server")
})

let roomIdGlobal,imgURLGlobal;

io.on("connection",(socket)=>{

    socket.on("userJoined",(data)=>{
        const {name,userId,roomId,host,presenter}=data;
        roomIdGlobal=roomId;
        socket.join(roomId);
        socket.emit("userIsJoined",{success:true})
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
            imgURL:imgURLGlobal,
        })
    })

    socket.on("whiteboardData",(data)=>{
        imgURLGlobal=data;
        socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
            imgURL:data, // updated data
        })
    })

    console.log("User connected");
})

const port=process.env.PORT || 5000;
server.listen(port,()=>{
    console.log("server is running on http://localhost:5000")
})