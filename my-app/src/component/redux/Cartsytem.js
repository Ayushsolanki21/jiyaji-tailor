import { createSlice } from '@reduxjs/toolkit';

const cartsystem = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    AddCart: (state, action) => {
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    deletecart: (state, action) => {
      return state.filter(item => item._id !== action.payload._id);
    },
  },
});

export const { AddCart, deletecart } = cartsystem.actions;
export default cartsystem.reducer;
