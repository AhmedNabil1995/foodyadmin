import './Chatbox.scss';
import InputEmoji from "react-input-emoji";
import Message from '../message/Message';
import { Fragment, useState } from 'react';
import axios from 'axios';
const Chatbox = ({messages,admin,currentChat,setMessages,setSendMess}) => {
    let [mymessage,setMyMessage] = useState('');
    let [val,setval] =useState('');
    let serverUrl = process.env.REACT_APP_SERVER_URL;


   const sendMessage =async ()=>{
        let message = {
            chatId : currentChat._id,
            senderId:admin._id,
            text : mymessage
        }

        let recieverId = currentChat.members.find((id)=>id != admin._id);

        setSendMess({...message,recieverId})
        setval('');
    try {
        let res = await axios.post(`${serverUrl}messages`,message);
        setMessages((prev)=>[...prev,res.data])
        
    } catch (err) {
        console.log(err)
    }
   } 

   const handleChange =(val)=>{
    setMyMessage(val)
    setval(val)
   }

  return (
    <div className='chatbox'>

        {currentChat &&
            <>
            <div className='messageContainer'>
            {messages?.map((message)=>{
                return(
                    <Fragment key={message?._id}>
                    <Message message={message} admin={admin}/>
                    </Fragment>
                )
            })}
            </div>
            <div className='sendMessage'>
                <InputEmoji cleanOnEnter={true} value={val} onChange={handleChange}/>
                <button className='send' onClick={sendMessage}>Send</button>
            </div>
            </>            
        }
        
    </div>
  )
}

export default Chatbox