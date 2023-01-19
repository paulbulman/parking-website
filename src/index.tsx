import React from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { ToastContainer, Zoom } from "react-toastify";
import { AuthContextProvider } from "./context/auth";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { config as FontAwesome } from "@fortawesome/fontawesome-svg-core";
import { App } from "./App";
import "bulma/css/bulma.min.css";
import "react-day-picker/dist/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./index.css";
import "./daypicker.css";

if (process.env.REACT_APP_USE_MSW === "true") {
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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={<div>Something went wrong. Please refresh, and try again.</div>}
    >
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <ToastContainer
              theme="light"
              transition={Zoom}
              hideProgressBar={true}
              closeButton={false}
            />
            <App />
        </AuthContextProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
