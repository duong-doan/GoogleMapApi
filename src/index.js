import React from "react";
import ReactDOM from "react-dom";
import "./assets/sass/main.scss";
import store from "./store/configStore";
import { Provider } from "react-redux";
import App from "./App.jsx";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
