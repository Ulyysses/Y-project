import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/App";
import { rootReducer } from "./services/reducers/rootReducer";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetOrders,
  wsConnectionStart,
} from "./services/orders";
import {
  allConnectionSuccess,
  allConnectionError,
  allConnectionClosed,
  allGetOrders,
  allConnectionStart,
} from "./services/ordersAll";
import { apiOrders, apiOrdersAll } from "./utils/api";

import "./index.scss";
import "./layout.scss";

const ordersActions = {
  wsConnectionSuccess: wsConnectionSuccess,
  wsConnectionError: wsConnectionError,
  wsConnectionClosed: wsConnectionClosed,
  wsGetMessage: wsGetOrders,
  wsConnectionStart: wsConnectionStart,
};

const allOrdersActions = {
  wsConnectionSuccess: allConnectionSuccess,
  wsConnectionError: allConnectionError,
  wsConnectionClosed: allConnectionClosed,
  wsGetMessage: allGetOrders,
  wsConnectionStart: allConnectionStart,
};

const store = configureStore({
  ...rootReducer,
  middleware: [
    thunk,
    socketMiddleware(apiOrders, ordersActions),
    socketMiddleware(apiOrdersAll, allOrdersActions),
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/Y-project">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
