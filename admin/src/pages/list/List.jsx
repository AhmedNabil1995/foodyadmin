import "./List.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataTable from "../../components/dataTable/DataTable"
import { useLocation } from "react-router"
import { useEffect, useState } from "react";
import {userColumns,mealColumns, orderColumns} from '../../dataTableResources'
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../redux/reducers/usersReducer";
import { getOrders } from "../../redux/reducers/orderReducer";
import { getMeals } from "../../redux/reducers/mealsReducer";

const List = () => {
  let [data,setData] = useState({Rows:[],Cols:[]});

  let list = useLocation();
  let dispatch = useDispatch();

  let {users} = useSelector(state=>state['users']);
  let {meals} = useSelector(state=>state.meals);
  let {orders} = useSelector(state=>state.orders);

  let {admin} = useSelector(state=>state.auth);

  useEffect(()=>{
    switch(list.pathname){
      case '/users':
          dispatch(getUsers(admin))
          break;
      case '/meals':
          dispatch(getMeals(admin))
          break;
      case '/orders':
        dispatch(getOrders({admin,limit:50}))
        break;
    }
  },[list])

  useEffect(()=>{
    switch(list.pathname){
      case '/users':
      setData({Rows:users,Cols:userColumns})
      break;
      case '/meals':
        setData({Rows:meals,Cols:mealColumns})
        break;
      case '/orders' :
        setData({Rows:orders,Cols:orderColumns})
        console.log(orders)
      break;
    }
  },[users,meals,orders])
  
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <DataTable Rows={data.Rows} Cols={data.Cols} title={`list${list.pathname}`} path={list.pathname}/>
        </div>
    </div>
  )
}

export default List