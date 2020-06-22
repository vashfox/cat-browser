import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import AppRoute from "./components/route";

import { Provider } from "react-redux";
import store from "./models/connect";

ReactDOM.render(
  <Provider store={store}>
    <AppRoute />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
