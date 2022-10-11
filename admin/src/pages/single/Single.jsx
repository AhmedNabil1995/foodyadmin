import "./Single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import {useParams } from "react-router"
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Update from "../../components/update/Update";
import { getUser } from "../../redux/apiCall/singleCall";
import axios from "axios";
import NoImage from '../../assets/noImage.jpg';
import { getAddress } from "../../address"
import {getUserOrders} from '../../redux/reducers/orderReducer';


const Single = () => {
  let {id} = useParams();
  let [item,setItem] = useState(null);
  let imgP = process.env.REACT_APP_SERVER_URL + '/images';
  let {admin} = useSelector(state=>state.auth);
  let [isupdate,setIsupdate] = useState(false);
  let [data,setData] = useState([]);
  let {orders} = useSelector(state=>state.orders);
  let dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserOrders({admin,userId:id}))
  },[id])

  useEffect(()=>{
      getUser(admin,id,setItem);
  },[id,isupdate])

  let serverUrl = process.env.REACT_APP_SERVER_URL;


  const getMonth = (monthNum)=>{
    switch(monthNum){
      case 1 : return 'January'; break;
      case 2 : return 'February'; break;
      case 3 : return 'March'; break;
      case 4 : return 'April'; break;
      case 5 : return 'May'; break;
      case 6 : return 'June'; break;
      case 7 : return 'July'; break;
      case 8 : return 'August'; break;
      case 9 : return 'September'; break;
      case 10 : return 'October'; break;
      case 11 : return 'November'; break;
      case 12 : return 'December'; break;
    }
  }

  useEffect(()=>{
    const getIncome = async()=>{
      let res =await axios.get(`${serverUrl}orders/monthly/spending/${id}`,{
        headers:{token:admin.token}
      })

      setData(res.data.map((m)=>{
        return (
            {
              name: getMonth(m._id),
              Total : m.total
            }
        )
      }))
    }

    id&&getIncome();
  },[id])


  const userData = [
    {id: 1,name : '_id',headerName: 'ID'},
    {id: 2,name : 'email',headerName: 'Email'},
    {id: 3,name : 'phone',headerName: 'Phone'},
    {id: 4,name : 'address',headerName: 'Address'},
];


  return (
    <div className='single'>
      {isupdate && <Update item={item} setIsupdate={setIsupdate}/>}
        <Sidebar />
        <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
                <button className="editButton" onClick={()=>setIsupdate(true)}>Edit</button>
                <h1 className="title">Information</h1>
                <div className="items">
                <img
                src={item?(typeof(item.image)==='string'?((item.image).startsWith('http')?item.image:imgP+'/'+item.image):URL.createObjectURL(item.image)):NoImage}
                alt=""
                className="itemImg"
              />
                  <div className="details">
                  <h1 className="itemTitle">{item?.firstName?.concat(' ',item?.lastName)||item?.name}</h1>
                  {item&&userData.map((el,i)=>{
                    return (
                      <div className="detailItem" key={el.id}>
                        <span className="itemKey">{el.headerName}</span>
                        <span className="itemValue">{el.name==='address'?getAddress(item[el.name]):item[el.name]?.toString()}</span>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart title={`last 6 month (spending)`} data={data} aspect={4/1}/>
              </div>
            </div>
            <div className="bottom">
              <p className="title">Last Transation</p>
               <List Orders={orders}/>
            </div>
        
        </div>
    </div>
  )
}

export default Single