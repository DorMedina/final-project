import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      console.log(action);
      state.products = state.products.filter(
        (item) => item.addedTimestamp !== action.payload.addedTimestamp
      );

      if (state.quantity !== 0) state.quantity -= 1;

      state.total -= action.payload.price * action.payload.quantity;
    },

    // removeProduct: (state, action) => {
    //   console.log(action);
    //   state.products.map((product) => {
    //     if (product.addedTimestamp === action.payload.addedTimestamp) {
    //       const nextCartItems = state.products.filter(
    //         (item) => item.addedTimestamp !== product.addedTimestamp
    //       );

    //       state.products = nextCartItems;
    //     }
    //     return state;
    //   });
    //   state.quantity -= 1;
    //   state.total -= action.payload.price * action.payload.quantity;
    // },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
