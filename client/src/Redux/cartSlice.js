import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const { name, price, image } = action.payload;
            const newItem = {
                id: state.items.length + 1,
                name,
                price,
                image,
                quantity: 1,
            };
            const existingItem = state.items.find((item) => item.name === name);
            if (!existingItem) {
                state.items.push(newItem);
            } else {
                existingItem.quantity++;
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        increaseQuantity: (state, action) => {
            const  id  = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const  id  = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity -= 1;
            }
        },
        removeAllItems: (state) => {
            state.items = []
        }
    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, removeAllItems  } = cartSlice.actions;

export default cartSlice.reducer;
