import './Navbar.scss';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {toggleMode} from '../../redux/reducers/darkmode';
import VideocamIcon from '@mui/icons-material/Videocam';



 const Navbar = () => {
  const {admin} = useSelector(state=>state.auth);
  let imgP = process.env.REACT_APP_SERVER_URL + 'images';
  let dispatch = useDispatch();
  
  const toggledark =()=>{
    dispatch(toggleMode())
  }

  return (
    <div className='navbar'>
      <div className='left'>
        <div className='searchContainer'>
          <input className='searchInput' placeholder='search..'/>
          <SearchOutlinedIcon className='SearchIcon'/>
        </div>
      </div>
      <div className='right'>
        <div className='item'>
          <LanguageOutlinedIcon className='icon'/>
          English
        </div>
        <div className='item'>
          <span onClick={toggledark}>
          <DarkModeOutlinedIcon className='icon'/>
          </span>
        </div>
        <div className='item'>
          <NotificationsNoneOutlinedIcon className='icon'/>
          <div className='counter'>1</div>
        </div>
        <div className='item'>
          <Link to='/chat' style={{color:'inherit'}}>
          <ChatBubbleOutlineOutlinedIcon className='icon'/>
          </Link>
        </div>
        <div className='item'>
        <Link to='/vediochat' style={{color:'inherit'}}>
          <VideocamIcon className='icon'/>
          </Link>
        </div>
        <div className='item'>
        <Link to='/home' style={{color:'inherit'}}>
          <ListOutlinedIcon className='icon'/>
          </Link>
        </div>
        <div className='item'>
          <img src={`${admin.image}`} className='avatar'/>
        </div>
        <div className='item'>
          <SettingsOutlinedIcon className='icon'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar