import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/App";
import "./index.scss";
import "./layout.scss";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { getCookie } from "./utils/cookie";
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
    socketMiddleware(
      `wss://norma.nomoreparties.space/orders?token=${getCookie(
        "accessToken"
      )}`,
      wsOrdersActions
    ),
    socketMiddleware(
      `wss://norma.nomoreparties.space/orders/all`,
      allOrdersAllActions
    ),
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
