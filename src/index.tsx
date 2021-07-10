import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthContextProvider } from "./context/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { config as FontAwesome } from "@fortawesome/fontawesome-svg-core";
import { App } from "./App";
import { CloseButton } from "./components/CloseButton";
import "bulma/css/bulma.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

FontAwesome.autoAddCss = false;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer
            transition={Zoom}
            hideProgressBar={true}
            closeButton={CloseButton}
          />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
