import './Sidebar.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from 'react-redux';
import {logOut} from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';
import { makedark, makelight } from '../../redux/reducers/darkmode';

 const Sidebar = () => {
  const {admin} = useSelector(state=>state.auth);
  const dispatch = useDispatch();

  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>foodyadmin</span>
      </div>
          <hr className='hr'/>
      <div className='center'>
        <ul>
          <p>Main</p>
          <li>
              <DashboardIcon className='icon' />
              <Link style={{color:'inherit',textDecoration:'none'}} to={'/home'}>
              <span>Dashboard</span>
              </Link>
          </li>
          <p>lists</p>
          <li>
            <PersonOutlineIcon className='icon' />
            <Link style={{color:'inherit',textDecoration:'none'}} to={'/users'}>
            <span>Users</span>
            </Link>
          </li>
          <li>
            <StoreIcon className='icon' />
            <Link style={{color:'inherit',textDecoration:'none'}} to={'/meals'}>
            <span>Meals</span>
            </Link>
          </li>
          <li>
            <CreditCardIcon className='icon' />
            <Link style={{color:'inherit',textDecoration:'none'}} to={'/orders'}>
            <span>Orders</span>
            </Link>
          </li>
          <li>
            <LocalShippingIcon className='icon' />
            <span>Deleviry</span>
          </li>
          <p>Useful</p>
          <li>
            <InsertChartIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className='icon' />
            <span>Notification</span>
          </li>
          <p>Servieces</p>
          <li>
            <SettingsApplicationsIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='icon' />
            <span>Settings</span>
          </li>
          <p>User</p>
          <li>
            <ExitToAppIcon className='icon' />
            <Link style={{color:'inherit',textDecoration:'none'}} to={`/users/${admin._id}`}>
            <span>Profile</span>
            </Link>
          </li>
          <li>
            <ExitToAppIcon className='icon' />
            <span onClick={()=>dispatch(logOut())}>Log out</span>
          </li>
        </ul>
      </div>
      <div className='bottom'>
        <p>Theme</p>
        <div className='themeContainer'>
          <div onClick={()=>dispatch(makelight())}></div>
          <div onClick={()=>dispatch(makedark())}></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
