import './Home.scss';
import  Navbar  from '../../components/navbar/Navbar';
import  Sidebar  from '../../components/sidebar/Sidebar';
import Wedget from '../../components/wedget/Wedget';
import Feature from '../../components/feature/Feature';
import Chart from '../../components/chart/Chart';
import List from '../../components/table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {getOrders} from '../../redux/reducers/orderReducer';

const Home = () => {
  let {admin} = useSelector(state=>state.auth)
  let serverUrl = process.env.REACT_APP_SERVER_URL;
  let [data,setData] = useState([])
  let [todayIncome,setTodayIncome] = useState(null);
  let {orders} = useSelector(state=>state.orders);
  let dispatch = useDispatch();
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
    dispatch(getOrders({admin,limit:6}))
  },[])

  useEffect(()=>{
    const getIncome = async()=>{
      let res =await axios.get(`${serverUrl}orders/monthly/income`,{
        headers:{token:admin.token}
      })
      
      res.data&&setData(res.data.map((m)=>{
        return (
            {
              name: getMonth(m._id),
              Total : m.total
            }
        )
      }))
    }

    getIncome();
  },[])

  useEffect(()=>{
    const gettodayIncome = async()=>{
      let res =await axios.get(`${serverUrl}orders/today/income`,{
        headers:{token:admin.token}
      })
      res.data&&setTodayIncome(res.data[0]?.total)
    }

    gettodayIncome();
  },[])

  let [userCount,setUserCount] = useState(0);
  useEffect(()=>{
    const getNumberOfUsers= async()=>{
      const res = await axios.get(`${serverUrl}users/numberOfUsers`,{
        headers:{token:admin.token}
      })
      setUserCount(res.data);
    }
    getNumberOfUsers();
  },[])

  let [orderCount,setOrderCount] = useState(0);
  useEffect(()=>{
    const getNumberOfOrder= async()=>{
      const res = await axios.get(`${serverUrl}orders/numberOfOrders`,{
        headers:{token:admin.token}
      })
      setOrderCount(res.data);
    }
    getNumberOfOrder();
  },[])

  let [allIncome,setAllIncome] = useState(0);
  useEffect(()=>{
    const getAllIncome= async()=>{
      const res = await axios.get(`${serverUrl}orders/all/income`,{
        headers:{token:admin.token}
      })
      setAllIncome(res.data);
    }
    getAllIncome();
  },[])

  let [usersDiff,setUsersDiff] = useState(0);
  useEffect(()=>{
    const getUsersDiff= async()=>{
      const res = await axios.get(`${serverUrl}users/deffrence/monthly`,{
        headers:{token:admin.token}
      })
      setUsersDiff(res.data);
    }
    getUsersDiff();
  },[])

  let [ordersDiff,setOrdersDiff] = useState(0);
  useEffect(()=>{
    const getOrdersDiff= async()=>{
      const res = await axios.get(`${serverUrl}orders/deffrence/monthly`,{
        headers:{token:admin.token}
      })
      setOrdersDiff(res.data);
    }
    getOrdersDiff();
  },[])

  let [incomeDiff,setIncomeDiff] = useState(0);
  useEffect(()=>{
    const getIncomeDiff= async()=>{
      const res = await axios.get(`${serverUrl}orders/deffrenceincome/monthly`,{
        headers:{token:admin.token}
      })
      setIncomeDiff(res.data);
    }
    getIncomeDiff();
  },[])

  return (
    <div className='home'>
        <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
            <Wedget type='user' amount={userCount} diff={usersDiff}/>
            <Wedget type='order' amount={orderCount} diff={ordersDiff}/>
            <Wedget type='earning' amount={allIncome} diff={incomeDiff}/>
            <Wedget type='balance' amount={allIncome?allIncome-allIncome*0.08:0} diff={incomeDiff}/>
        </div>
        <div className='charts'>
            <Feature total={todayIncome}/>
            <Chart title='Last 6 months (income)' data={data} aspect={3/1}/>
        </div>
        <div className='tableContainer'>
          <p>Latest Transaction</p>
          <List Orders={orders}/>
        </div>
      </div>
    </div>
  )
}

export default Home
