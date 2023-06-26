import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/App";
import "./index.scss";
import "./layout.scss";
import { BrowserRouter } from "react-router-dom";

const store = configureStore(rootReducer, applyMiddleware(thunk));

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
