import React from "react";
import ReactDOM from "react-dom/client";
// import { applyMiddleware } from 'redux';
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/App";
import "./index.scss";
import "./layout.scss";

const store = configureStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
