import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
let url = process.env.REACT_APP_SERVER_URL;

export const getUsers = createAsyncThunk('get/users',async(admin)=>{
    let res = await axios.get(`${url}users`,{
        headers:{token:admin.token}
    });

    return res.data
})

export const deleteUser = createAsyncThunk('delete/users',async({admin,id})=>{

    let res = await axios.delete(`${url}users/${id}`,{
        headers:{token:admin.token}
    });

    return res.data
})


export const addUser = createAsyncThunk('add/users',async(user)=>{

    let res = await axios.post(`${url}auth/register`,user);
    return res.data;
})

export const updateUser = createAsyncThunk('update/users',async({admin,id,user})=>{
    let res = await axios.put(`${url}users/${id}`,user,{
        headers:{token:admin.token},
    });

    return res.data
})

const usersSlice = createSlice({
    name:'users',
    initialState:{users:[],isFetching:false,err:false},
    reducers:{},
    extraReducers:{
        [getUsers.pending]:(state)=>{
            state.isFetching = true;
            state.err = false;
        },
        [getUsers.fulfilled]:(state,action)=>{
            state.isFetching = false;
            state.err = false;
            state.users = action.payload;
        },
        [getUsers.rejected]:(state)=>{
            state.isFetching = false;
            state.err = true;
        },

        [deleteUser.fulfilled]:(state,action)=>{
            state.users = state.users.filter((user)=>{
                return user._id != action.payload._id;
            })
        },
        [addUser.fulfilled]:(state,action)=>{
            state.users.push(action.payload);
        },
        [updateUser.fulfilled]:(state,action)=>{
            state.users= state.users.map((user)=>{
                   return action.payload._id == user._id ? action.payload : user ;
            });
        },
    },
    

})

export default usersSlice.reducer;