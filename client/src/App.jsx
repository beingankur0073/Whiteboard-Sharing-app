import { useEffect, useState } from 'react'

import './App.css'
import Forms from './components/Forms/index.jsx'
import { Routes,Route } from 'react-router-dom'
import RoomPage from './pages/RoomPage/index.jsx'
import io from 'socket.io-client'



const server="http://localhost:5000";

const connectionOptions={
  "force new connection":true,
  reconnectionAttempts:"Infinity",
  timeout:10000,
  transports:["websocket"]
}

const socket=io(server,connectionOptions);
console.log("socket",socket);

function App() {
  const [user,setUser]=useState(null);
  const [users,setUsers]=useState([]);

  useEffect(()=>{
 
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined");
        setUsers(data.users);
      }
      else console.log("userJoined error");

      socket.on("allUsers",(data)=>{
        setUsers(data);
      })
    })
  },[])
  
  return (

     <div className='container'>
      
      <Routes>
        <Route path='/' element={<Forms socket={socket} setUser={setUser}/>}></Route>
        <Route path='/:roomId' element={<RoomPage  user={user} socket={socket} users={users}/>}></Route>
      </Routes>

     </div>
  )
}

export default App
