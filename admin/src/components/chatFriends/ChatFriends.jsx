import SearchOutlined from "@mui/icons-material/SearchOutlined"
import "./ChatFriends.scss"
import Conversation from "../conversation/Conversation"
import { Fragment } from "react"


const ChatFriends = ({chats,admin,setMessages,setCurrentChat,onlineFriends}) => {

  return (
    <div className='chatFriends'>
        <div className="searchContainer">
            <input placeholder="search for friend"/>
            <SearchOutlined style={{fontSize:'18px'}}/>
        </div>
        <div className="friends">
            {chats?.map((chat,i)=>(
                <Fragment key={i}>
                    <Conversation onlineFriends={onlineFriends} setCurrentChat={setCurrentChat} chat={chat} admin={admin} setMessages={setMessages}/>
                    <hr style={{height:'2px',border:'none',backgroundColor:'#eee'}}/>
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default ChatFriends