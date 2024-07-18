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

io.on("connection",(socket)=>{
    console.log("User connected");
})

const port=process.env.PORT || 5000;
server.listen(port,()=>{
    console.log("server is running on http://localhost:5000")
})