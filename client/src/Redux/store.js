import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const Store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    }
});

export default Store;