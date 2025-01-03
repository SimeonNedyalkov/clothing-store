import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const cartSlice = createSlice({
  name: "cart",
  initialState: { isCartOpen: false, isChatBotOpen: false },
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    toggleChatBot(state) {
      state.isChatBotOpen = !state.isChatBotOpen;
    },
  },
});
export const { toggleCart, closeCart, openCart, toggleChatBot } =
  cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
