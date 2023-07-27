import React from "react";
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
} from "./services/ordersAll.js";
import { apiOrders, apiOrdersAll } from "./utils/api";

import "./index.scss";
import "./layout.scss";

const wsOrdersActions = [
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetOrders,
  wsConnectionStart,
];

const allOrdersAllActions = [
  allConnectionSuccess,
  allConnectionError,
  allConnectionClosed,
  allGetOrders,
  allConnectionStart,
];

const store = configureStore({
  ...rootReducer,
  middleware: [
    thunk,
    socketMiddleware(apiOrders, wsOrdersActions),
    socketMiddleware(apiOrdersAll, allOrdersAllActions),
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
