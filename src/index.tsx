import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthContextProvider } from "./context/auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import "bulma/css/bulma.min.css";
import "react-toastify/dist/ReactToastify.min.css";
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

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastContainer hideProgressBar transition={Zoom} />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
