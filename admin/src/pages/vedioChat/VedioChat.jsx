import React from 'react'
import { useContext } from 'react'
import Navbar from '../../components/navbar/Navbar';
import { SocketContext } from '../../vedioChatContext'
import Notification from './Notification';
import './VedioChat.scss';
import VedioFriends from './VedioFriends';
const VedioChat = () => {
    const {
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        answerCall,
      } = useContext(SocketContext)
  return (
    <div className='vedio'>
        <div className='nav'>
        <Navbar />
        </div>
        <div className='videoContainer'>
        {stream&&<div className='video'><video className='vedio' autoPlay playsInline ref={myVideo} muted/></div>}
        {callAccepted&&!callEnded&&<div className='video'><video className='vedio' autoPlay playsInline ref={userVideo}/></div>}
        </div>
      <VedioFriends />
      {call?.isReceivingCall&&!callAccepted&&<Notification />}
    </div>
  )
}

export default VedioChat
