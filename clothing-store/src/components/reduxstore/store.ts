import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { isCartOpen: false },
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
  },
});
export const { toggleCart, closeCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export default store;
