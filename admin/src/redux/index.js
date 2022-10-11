import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import mealsReducer from './reducers/mealsReducer';
import usersReducer from './reducers/usersReducer';
import orderReducer from './reducers/orderReducer';
import darkmodeReducer from './reducers/darkmode';

const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersReducer,
        meals :mealsReducer,
        orders : orderReducer,
        darkmode:darkmodeReducer
    }
});

export default store;