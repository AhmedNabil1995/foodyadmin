import React, { useContext } from 'react'
import { SocketContext } from '../../vedioChatContext'
const Notification = () => {
    const {
        answerCall,
      } = useContext(SocketContext)
  return (
    <div className='notification'>
      <h3>Reiciving a call from <span>hamada</span></h3>
      <button onClick={answerCall}>answer call</button>
    </div>
  )
}

export default Notification
