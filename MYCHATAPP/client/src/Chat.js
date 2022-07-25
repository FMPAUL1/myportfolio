
import { useEffect, useState } from 'react';
import Scrollbar from 'react-scroll-to-bottom'
import './App.css';

function Chat({socket, username, room}) {
  const[currentmessage,setcurrentmessage]=useState("")
  const[messageList,setmessageList]=useState([])

const Sendmessage=async()=>{
  
 
  if(currentmessage!==""){
    const MessageData={

      room:room,
      author:username,
      message:currentmessage,
      time:
      new Date(Date.now()).getHours() + ":"+ new Date (Date.now()).getMinutes()
    };
    await  socket.emit("send-message",MessageData)
setmessageList((list)=>[...list, MessageData]);
setcurrentmessage("")
  }
 
}

useEffect (()=>{
  socket.on("recieve-message",(data)=>{
    setmessageList((list)=>[...list,  data]);
    console.log(data)
  })
},[socket])

  return (
 
    <div className="chat-window">
      <div className='chat-header'>
        <p>A.T.P CHAT-APP</p>
      </div>
   
    <div className='chat-body'>
      <Scrollbar className='message-container'>
      {messageList.map((mesageContent)=>{
      return (
        < div 
        className='message' 
        id={username===mesageContent.author? "you":"other"}>
          <div className='message-content'>
            <p>{mesageContent.message}</p>
          </div>
          <div className='message-meta'>
            <p id='time'>{mesageContent.time}</p>
            <p id='author'>{mesageContent.author}</p> 
            </div>
        </div>
        
      )
    })}
    </Scrollbar>
    </div>
    
    <div className='chat-footer'>
      <input 
      type="text"
      placeholder='enter message'
       value={currentmessage} 
      onKeyPress={(event)=>{
        event.key==="Enter" && Sendmessage()
      }}
      onChange={(e)=>{setcurrentmessage(e.target.value)}}/>
      <button  onClick={Sendmessage}>&#9658;</button>
      </div>
   
    
    </div>
  );
}

export default Chat;
