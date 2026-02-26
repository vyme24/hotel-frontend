import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // For hotel rooms, usually we only want one booking at a time or multiple different rooms
            // The user said: "Prevent adding already booked rooms to the cart and show an error message."
            // I will handle the "already in cart" check here.
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.items.push(action.payload);
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
