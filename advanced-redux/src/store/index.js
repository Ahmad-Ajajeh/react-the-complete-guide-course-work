import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;

// configureStore for creating a store that combines
// the reducers of multiple slices . from redux toolkit

// createSlice for creating a slice of state and reducers .
// from redux toolkit

// Provider component must wrap the app in the index.js
// useSelector
// useDispatch
// from react-redux
