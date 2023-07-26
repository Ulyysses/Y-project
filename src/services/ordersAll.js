import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  total: null,
  totalToday: null,
};

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    allConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    allConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    allConnectionClosed: (state) => {
      state.wsConnected = false;
      state.error = undefined;
    },
    allGetOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.error = undefined;
    },
    allConnectionStart: () => {},
  },
});

export const {
  allConnectionSuccess,
  allConnectionError,
  allConnectionClosed,
  allGetOrders,
  allConnectionStart,
} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
