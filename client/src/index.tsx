import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>
);
