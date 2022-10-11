import './Chat.scss'
import Navbar from '../../components/navbar/Navbar';
import ChatFriends from '../../components/chatFriends/ChatFriends';
import Chatbox from '../../components/chatBox/Chatbox';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';
import axios from 'axios';
const Chat = () => {
    let [userChats,setUserChats] = useState([]);
    let [messages,setMessages] = useState([]);
    let [currentChat,setCurrentChat] = useState(null);
    let [onlineFriends,setOnlineFriends] = useState(null);
    let [sendMess,setSendMess] = useState(null);
    let {admin} = useSelector(state=>state.auth);
    let [admins,setadmins] = useState();
    let serverUrl = process.env.REACT_APP_SERVER_URL;
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let socket = useRef();
    useEffect(()=>{
        const getChats = async ()=>{
           try {
            let res = await axios.get(`${serverUrl}chats/${admin._id}`);
            setUserChats(res.data)
           } catch (err) {
            console.log(err);
           }
        }
        getChats()
    },[admin])

    useEffect(()=>{
        const getadmins = async ()=>{
           try {
            let res = await axios.get(`${serverUrl}users/admin`,{
                headers:{
                    token : admin.token
                }
            });
    
            setadmins(res.data)
           } catch (err) {
            console.log(err);
           }
        }
        getadmins()
    },[])



    useEffect(()=>{
        socket.current = io('https://foody-socket.herokuapp.com');
        socket.current.emit('addUser',admin._id);
        socket.current.on('getUsers',(users)=>{
            setOnlineFriends(users);
        })
    },[admin])

    useEffect(()=>{

        if(sendMess !== null){
            socket.current.emit('sendMessage',sendMess);
        }

    },[sendMess])

    useEffect(()=>{
        socket.current.on('recieveMessage',(data)=>{
            setMessages((prev)=>{return [...prev,data]});
        })
    },[])


    const makenewChat =async(adminFriend)=>{

        try {
            let res = await axios.get(`${serverUrl}chats/${admin._id}/${adminFriend._id}`);    
 
            if(!res.data){

                let res2 = await axios.post(`${serverUrl}chats`,{
                    senderId: admin._id,
                    recieverId: adminFriend._id
                });
                setUserChats([res2.data,...userChats])
            }
           } catch (err) {
            console.log(err);
           }
    }

  return (
    <div className='chat'>
        <Navbar />
        <div className='chatContainer'>
            <div className='left'>
               <ChatFriends  onlineFriends={onlineFriends} setCurrentChat={setCurrentChat} chats={userChats} setMessages={setMessages} admin={admin}/>
            </div>
            <div className='center'>
               { messages && <Chatbox setSendMess={setSendMess} setMessages={setMessages} currentChat={currentChat}  messages={messages} admin={admin}/>}
            </div>
            <div className='right'>
                {admins?.map((admin)=>{
                    return (
                            <Fragment key={admin._id}>
                            <div className="admin" onClick={()=>makenewChat(admin)}>
                                <img src={`${admin?.image}`} />
                                <span >{admin?.firstName} {admin?.lastName}</span>
                            </div>
                            </Fragment>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Chat