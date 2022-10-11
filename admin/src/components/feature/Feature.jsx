import './Feature.scss'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Feature = ({total}) => {
  return (
    <div className='feature'>
        <div className='top'>
            <span>Total Revenue</span>
            <MoreVertIcon className='topIcon'/>
        </div>
        <div className='bottom'>
            <div className='featureChart'>
                <CircularProgressbar value={`70`} text={`70%`} strokeWidth={`5`}/>
            </div>
            <p className='title'>Total sales made today</p>
            <p className='amount'>Egp{total}</p>
            <p className='desc'>Previous transactions processing. Last payments may not be included.</p>
            <div className='summery'>
                <div className='item'>
                    <span className='itemTitle'>Target</span>
                    <div className='itemResult positive'>
                        <KeyboardArrowUpOutlinedIcon />
                        <div className='resultAmount'>$12.4k</div>
                    </div>
                </div>
                <div className='item'>
                    <span className='itemTitle'>Last Week</span>
                    <div className='itemResult negitive'>
                        <KeyboardArrowDownIcon />
                        <div className='resultAmount'>$12.4k</div>
                    </div>
                </div>
                <div className='item'>
                    <span className='itemTitle'>Last Month</span>
                    <div className='itemResult positive'>
                        <KeyboardArrowUpOutlinedIcon />
                        <div className='resultAmount'>$12.4k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Feature