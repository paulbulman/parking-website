import { ReactNode } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/auth";

export const renderInProvider = (component: ReactNode) => {
  const queryClient = new QueryClient();

  render(
    <MemoryRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </AuthContextProvider>
    </MemoryRouter>
  );
};

export const ensureLoadingIsComplete = async () => {
  await waitFor(() => {
    expect(
      screen.queryByText("Loading, please wait...")
    ).not.toBeInTheDocument();
  });
};
