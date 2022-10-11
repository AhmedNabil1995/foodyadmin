import "./SingleOrder.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../redux/reducers/orderReducer";

const SingleOrder = () => {
    let serverPath =  process.env.REACT_APP_SERVER_URL;
    let imgP = process.env.REACT_APP_SERVER_URL + '/images';
    let dispatch = useDispatch();
    let {admin} = useSelector(state=>state.auth);
    let [data,setData] = useState(null);
    let [status,setstatus] = useState('pending');
    let {id} = useParams();
   

    useEffect(()=>{

        const getOrder = async()=>{
            try {
                let res = await axios.get(`${serverPath}orders/${id}`,{
                    headers:{token:admin.token}
                });
                setData(res.data)
                
            } catch (err) {
                console.log(err)
            }
        }
        getOrder();

    },[id])

    useEffect(()=>{
        setstatus(data?.status);
    },[data])

    const handleChange=(e)=>{
        setstatus(e.target.value);
    }

    const updateorder =()=>{
        dispatch(updateOrder({admin,id,status}));
        console.log(status);
    }
        

  return (
    <div className="order">
        <Sidebar />
        <div className="orderContainer">
            <Navbar />
            <div className="bottom">
                <div className="">
                    <h1>Order : <span>{data?._id}</span></h1>
                    <div className="userInfo">
                        <h3>User Info</h3>
                    <div className="info">
                            <span className="key">User Id: </span>
                            <span className="value">{data?.user?._id}</span>
                        </div>
                        <div className="info">
                            <span className="key">User Name: </span>
                            <span className="value">{data?.user?.firstName+' '+data?.user?.lastName}</span>
                        </div>
                        <div className="info">
                            <span className="key">Email: </span>
                            <span className="value">{data?.user?.email}</span>
                        </div>
                    </div>
                    <div className="productsInfo">
                        <h3>Meals Info</h3>
                    {data&&data.meals.map(((meal,i)=>{
                        return (
                            <div className="meal" key={i}>
                                <div className="info">
                                <span className="key">meal ID: </span>
                                <span className="value">{meal?.meal?._id}</span>
                                </div>
                                <div className="info">
                                <span className="key">Name: </span>
                                <span className="value">{meal?.meal?.name}</span>
                                </div>
                                <div className="info">
                                <span className="key">Price: </span>
                                <span className="value">Egp{meal?.meal?.price}</span>
                                </div>
                                <div className="info">
                                <span className="key">Quantity: </span>
                                <span className="value">{meal?.quantity}</span>
                                </div>
                            </div>
                        )
                    }))}
                    </div>
                </div>
                <div className="info">
                    <span className="key">Amount: </span>
                    <span className="value">Egp{data?.amount}</span>
                </div>
                <div className={`info`}>
                    <span className="key">Status: </span>
                    <span className={`status ${status}`}>{status}</span>
                    <select defaultValue={''} onChange={handleChange}>
                    {<option disabled={true} value={''}>Choose Status</option>}
                        {data?.status!=="pending" &&<option value={`pending`}>Pending</option>}
                        {data?.status!=="approved"&&<option value={`approved`}>Approved</option>}
                        {data?.status!=="rejected"&&<option value={`rejected`}>Rejected</option>}
                        {data?.status!=="completed"&&<option value={`completed`}>completed</option>}
                    </select>
                    <button className="confirm" onClick={updateorder}>Confirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleOrder