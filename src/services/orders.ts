import { createSlice } from "@reduxjs/toolkit";
import { IOrders } from "../types";

const initialState: {
  wsConnected: boolean;
  orders: IOrders[];
  error: string | undefined;
} = {
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
    wsGetOrders: (
      state,
      action: {
        type: string;
        payload: MessageEvent<any>;
      }
    ) => {
      const { data } = action.payload;
      const parsedData = JSON.parse(data);
      const { success, ...restParsedData } = parsedData;

      state.orders = restParsedData.orders;
      state.error = undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
