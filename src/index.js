import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./services/reducers/rootReducer";
import { Provider } from "react-redux";
import App from "./components/app/App";
import "./index.scss";
import "./layout.scss";

const store = configureStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
