import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthContextProvider } from "./context/auth";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { config as FontAwesome } from "@fortawesome/fontawesome-svg-core";
import { App } from "./App";
import { CloseButton } from "./components/CloseButton";
import "bulma/css/bulma.min.css";
import "react-day-picker/lib/style.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./index.css";
import "./daypicker.css";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      Sentry.captureException(error);
    },
  }),
});

FontAwesome.autoAddCss = false;

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={<div>Something went wrong. Please refresh, and try again.</div>}
    >
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <ToastContainer
              transition={Zoom}
              hideProgressBar={true}
              closeButton={CloseButton}
            />
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
