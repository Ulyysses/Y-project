import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
      state.error = undefined;
    },
    wsGetOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.error = undefined;
    },
    wsConnectionStart: () => {},
  },
});

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetOrders,
  wsConnectionStart,
} = ordersSlice.actions;

export default ordersSlice.reducer;
