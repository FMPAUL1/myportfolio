import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat';
const socket=io.connect("http://localhost:3001")

function App() {
  const [username, setusername]=useState("");
  const [room,setroom]=useState("")
  const [showchat, setshowchat]=useState(false);

  const Joinroom=()=>{
    if(username!=="" && room!=""){

      socket.emit("join-room",room)
      setshowchat(true);
      alert(` DEAR ${username} YOUR ARE WELCONE TO CHAT ROOM: ${room}`)

    }
  }

  return (
    <div className='App'>
      {!showchat ? (
      <div className='joinChatContainer'>

        <h3>ATP_CHAT_APP</h3>
        
        <input type="text"
         placeholder='enter your username'
        onChange={(e)=>{setusername(e.target.value)}}
        
        />

        <input 
        type="text"
         placeholder='enter your room'
        onChange={(e)=>{setroom(e.target.value)}}
        />
        
        <button onClick={Joinroom}>Joinchat</button>
        <span>contact Team on 07080824483</span>
        </div>
       
   ) :(
        <Chat socket={socket} username={username} room={room}/>   
      
     )}
       </div>
      
  )
}

export default App