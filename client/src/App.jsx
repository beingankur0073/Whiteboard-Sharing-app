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

function App() {
  const [user,setUser]=useState(null);

  useEffect(()=>{
 
    socket.on("userIsJoined",(data)=>{
      if(data.success){
        console.log("userJoined");
      }
      else console.log("userJoined error")
    })
  },[])
  
  return (

     <div className='container'>
      
      <Routes>
        <Route path='/' element={<Forms socket={socket} setUser={setUser}/>}></Route>
        <Route path='/:roomId' element={<RoomPage/>}></Route>
      </Routes>

     </div>
  )
}

export default App
