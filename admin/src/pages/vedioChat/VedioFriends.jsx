import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector} from 'react-redux'
import axios from 'axios';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CancelIcon from '@mui/icons-material/Cancel';
import { SocketContext } from '../../vedioChatContext';
import { useContext } from 'react';

const VedioFriends = () => {
const {admin} = useSelector(state=>state.auth);
const [friends,setFriends] = useState([]);
const {
    callAccepted,
    callEnded,
    online,
    callUser,
    leaveCall,
  } = useContext(SocketContext)
    useEffect(()=>{
        const getAdmins =async()=>{
           const res = await axios.get(process.env.REACT_APP_SERVER_URL+'users/admin',{
                headers:{token:admin.token}
            })
            setFriends(res.data);
        }
        getAdmins();
    },[])
  return (
    <div className='vediofriends'>
      {friends.map((friend)=>{
        return (
            <div className='friend' key={friend?._id}>
                <div className='imgContainer'>
                    <img src={friend?.image.startsWith('http')?friend?.image:process.env.REACT_APP_SERVER_URL+'images/'+friend?.image} alt=''/>
                    <div className='dot'></div>
                </div>
                <span>{friend?.firstName} {friend?.lastName}</span>
                {!callAccepted&&!callEnded&&online.some((el)=>el.userId===friend._id)&&<div className='callfriend' onClick={()=>callUser(online.find((el)=>{
                    return el.userId === friend._id
                })?.socketId
                )}><VideocamIcon /></div>}
                {}
                {callAccepted&&!callEnded&&online.some((el)=>el.userId===friend._id)&&<div className='endcall' onClick={leaveCall}><CancelIcon /></div>}
            </div>
        )
      })}
    </div>
  )
}

export default VedioFriends
