import React, { useEffect, useState } from 'react'
import axios from "axios"


const Conversation = ({chat,admin,setMessages,setCurrentChat,onlineFriends}) => {

    let serverUrl = process.env.REACT_APP_SERVER_URL;
    let imgP = process.env.REACT_APP_SERVER_URL + 'images';
    let [friend,setFriend] = useState(null);

    useEffect(()=>{
        let friendId = chat.members.find((id)=>(id !== admin._id))

        const getFriend = async()=>{
           let res = await axios.get(`${serverUrl}users/${friendId}`,{
            headers:{token:admin.token}
           })
           setFriend(res.data)
        }
        getFriend()
    },[chat])


const handleConversationMessage =async(id)=>{
    setCurrentChat(chat)
    const res = await axios.get(`${serverUrl}messages/${id}`);
    setMessages(res.data);
    
}

  return (
    <>
        <div className="friend" onClick={()=>handleConversationMessage(chat._id)}>
                <div className="imgContainer">
                    <img src={friend?`${friend?.image}`:''} className="image"/>
                    {onlineFriends?.some((el)=>{return (el.userId ==friend?._id)}) &&<div className="onlineDot"></div>}
                </div>
                <div className="info">
                    <span className="friendName">{friend?.firstName} {friend?.lastName}</span>
                    <span className="online">{onlineFriends?.some((el)=>{return (el.userId ==friend?._id)})?"Online":"Offline"}</span>
                </div>
            </div>
    </>
  )
}

export default Conversation