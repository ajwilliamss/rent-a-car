import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import DevTools from "./redux/containers/DevTools";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
      {process.env.NODE_ENV !== "production" && <DevTools />}
    </Provider>
  </React.Fragment>
);
