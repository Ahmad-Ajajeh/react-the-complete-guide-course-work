import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;

// import { createStore } from "redux";
// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       showCounter: state.showCounter,
//       counter: state.counter + 1,
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       showCounter: state.showCounter,
//       counter: state.counter + action.payload,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       showCounter: state.showCounter,
//       counter: state.counter - 1,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };
