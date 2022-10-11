import { createSlice } from "@reduxjs/toolkit";


const darkmode = createSlice({
    name:'darkmode',
    initialState:{value:false},
    reducers:{
        makedark:(state)=>{
            state.value = true;
        },
        makelight:(state)=>{
            state.value = false;
        },
        toggleMode:(state)=>{
            state.value = !state.value;
        }
    }
})


export default darkmode.reducer;

export const {makedark,makelight,toggleMode} = darkmode.actions;