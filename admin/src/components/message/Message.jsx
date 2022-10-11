import React, { useEffect, useRef, useState } from 'react'
import noImage from  '../../assets/noImage.jpg';
import {format} from 'timeago.js'
import axios from 'axios';

const Message = ({message,admin}) => {
    let [sender,setuser] = useState(null);
    let serverUrl = process.env.REACT_APP_SERVER_URL;
    let imgP = process.env.REACT_APP_SERVER_URL + 'images';
    let lastMessage = useRef()
    useEffect(()=>{

        const getSender = async()=>{
           let res = await axios.get(`${serverUrl}users/${message.senderId}`,{
            headers:{token:admin.token}
           })
           setuser(res.data)
        }
       message && getSender()
       
    },[message])

    useEffect(()=> {
        lastMessage.current?.scrollIntoView({ behavior: "smooth" });
      },[message])

  return (
    <>
    <div ref={lastMessage} className={admin._id==message.senderId?"message own":'message'}>
                <div className="messageInfo">
                    <img src={sender?`${sender.image}`:noImage} className="image"/>
                    <span className="text">{message.text}</span>
                </div>
                    <span className="time">{format(message.createdAt)}</span>
            </div>
    </>
  )
}

export default Message