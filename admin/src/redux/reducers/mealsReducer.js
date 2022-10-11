import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

let url = process.env.REACT_APP_SERVER_URL;

export const getMeals = createAsyncThunk('get/meals',async(admin)=>{
    let res = await axios.get(`${url}meals?page=1&limit=60`,{
        headers:{token:admin.token}
    });
    return res.data.meals
})

export const deleteMeal = createAsyncThunk('delete/meal',async({admin,id})=>{

    let res = await axios.delete(`${url}meals/${id}`,{
        headers:{token:admin.token}
    });

    return res.data
})

export const addMeal = createAsyncThunk('add/meal',async({admin,meal})=>{
    console.log(meal)
    let res = await axios.post(`${url}meals`,meal,{
        headers:{token:admin.token},
    });
    console.log(res.data)
    return res.data
})

export const updateMeal = createAsyncThunk('update/meal',async({admin,id,meal})=>{
    let res = await axios.put(`${url}meals/${id}`,meal,{
        headers:{token:admin.token},
    });

    return res.data
})

export const updateIngredients = createAsyncThunk('update/ingredients',async({admin,id,ingredients})=>{
    let res = await axios.put(`${url}meals/${id}/ingredients`,ingredients,{
        headers:{token:admin.token},
    });

    return res.data
})

export const updateInstructions = createAsyncThunk('update/instructions',async({admin,id,instructions})=>{
    let res = await axios.put(`${url}meals/${id}/instructions`,instructions,{
        headers:{token:admin.token},
    });

    return res.data
})

const mealsSclice = createSlice({
    name:'meals',
    initialState:{meals:[],isFetching:false,err:false},
    extraReducers:{

        [getMeals.pending]:(state)=>{
            state.isFetching = true;
            state.err = false;
        },
        [getMeals.fulfilled]:(state,action)=>{
            state.isFetching = false;
            state.err = false;
            state.meals = action.payload;
        },
        [getMeals.rejected]:(state)=>{
            state.isFetching = false;
            state.err = true;
        },
        [deleteMeal.fulfilled]:(state,action)=>{
            state.meals = state.meals.filter((meal)=>{
                return meal._id != action.payload._id;
            })
        },
        [addMeal.fulfilled]:(state,action)=>{
            state.meals.push(action.payload);
        },
        [updateMeal.fulfilled]:(state,action)=>{
            state.meals= state.meals.map((meal)=>{
                   return action.payload._id == meal._id ? action.payload : meal ;
            });
        },
        [updateIngredients.fulfilled]:(state,action)=>{
            state.meals= state.meals.map((meal)=>{
                   return action.payload._id == meal._id ? action.payload : meal ;
            });
        },
        [updateInstructions.fulfilled]:(state,action)=>{
            state.meals= state.meals.map((meal)=>{
                   return action.payload._id == meal._id ? action.payload : meal ;
            });
        },
    }
})

export default mealsSclice.reducer;