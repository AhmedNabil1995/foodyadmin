import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


let url = process.env.REACT_APP_SERVER_URL;

export const getOrders = createAsyncThunk('get/orders',async({admin,limit})=>{
 
    let res = await axios.get(`${url}orders/?limit=${limit}`,{
        headers:{token:admin.token}
    });

    return res.data
})

export const getUserOrders = createAsyncThunk('/userorders',async({admin,userId})=>{
    let res = await axios.get(`${url}orders/userOrders/${userId}`,{
        headers:{token:admin.token}
    });
    return res.data
})

export const deleteOrder = createAsyncThunk('delete/order',async({admin,id})=>{

    let res = await axios.delete(`${url}orders/${id}`,{
        headers:{token:admin.token}
    });

    return res.data
})


export const updateOrder = createAsyncThunk('update/orders',async({admin,id,status})=>{
    let res = await axios.put(`${url}orders/${id}`,{status},{
        headers:{token:admin.token},
    });

    return res.data
})

const orderSlice = createSlice({
    name:'orders',
    initialState:{orders:[],isFetching:false,err:false},
    extraReducers:{

        [getOrders.pending]:(state)=>{
            state.isFetching = true;
            state.err = false;
        },
        [getOrders.fulfilled]:(state,action)=>{
            state.isFetching = false;
            state.err = false;
            state.orders = action.payload;
        },
        [getOrders.rejected]:(state)=>{
            state.isFetching = false;
            state.err = true;
        },
        [deleteOrder.fulfilled]:(state,action)=>{
            state.orders = state.orders.filter((order)=>{
                return order._id !== action.payload._id;
            })
        },
        [updateOrder.fulfilled]:(state,action)=>{
            state.orders= state.orders.map((order)=>{
                   return action.payload._id === order._id ? action.payload : order ;
            });
        },
        [getUserOrders.fulfilled]:(state,action)=>{
            state.orders= action.payload;
        },
    }
})

export default orderSlice.reducer;