import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import cookie from 'cookiejs';

let url = process.env.REACT_APP_SERVER_URL;

export const fetchUser = createAsyncThunk('auth/login',async(admin)=>{
        let res = await axios.post(`${url}auth/login`,admin);
        return res.data
})

export const logOut = createAsyncThunk('auth/logout',async()=>{
    return null
})

const authSlice = createSlice({
    name:'auth',
    initialState:{admin: JSON.parse(cookie.get('admin'))|| null,isFetching:false,err:false},

    extraReducers:{
        [fetchUser.pending]:(state)=>{
            state.isFetching = true;
            state.err = false;
        },
        [fetchUser.fulfilled]:(state,action)=>{
            state.isFetching =false;
            if(action.payload.isAdmin){
                state.err = false;
                state.admin = action.payload;
                cookie('admin',JSON.stringify(action.payload),1);
            }else{
                state.err = true;
                console.log('aaaaaa')
            }
        },
        [fetchUser.rejected]:(state)=>{
            state.isFetching = false;
            state.err = true;
        },
    
        [logOut.pending]:(state)=>{
            state.isFetching=true;
            state.err =false;
        },
        [logOut.fulfilled]:(state,action)=>{
            state.isFetching = false;
            state.err = false;
            state.admin = action.payload;
            cookie.remove('admin');
        },
        [logOut.rejected]:(state)=>{
            state.isFetching =false;
            state.err = true;
            
        },

    } 
    
})

export default authSlice.reducer;