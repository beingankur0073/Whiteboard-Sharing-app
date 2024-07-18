import { useState } from 'react'

import './App.css'
import Forms from './components/Forms/index.jsx'
import { Routes,Route } from 'react-router-dom'
import RoomPage from './pages/RoomPage/index.jsx'

function App() {
 

  return (

     <div className='container'>
      
      <Routes>
        <Route path='/' element={<Forms/>}></Route>
        <Route path='/:roomId' element={<RoomPage/>}></Route>
      </Routes>

     </div>
  )
}

export default App
