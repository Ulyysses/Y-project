import { createSlice } from "@reduxjs/toolkit";
import { IOrders } from "../types";

const initialState: {
  wsConnected: boolean;
  orders: IOrders[];
  error: string | undefined;
  total: number | null;
  totalToday: number | null;
} = {
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
    allGetOrders: (
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
      state.total = restParsedData.total;
      state.totalToday = restParsedData.totalToday;
      state.error = undefined;
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
