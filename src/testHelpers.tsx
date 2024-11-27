import { ReactNode } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/auth";

export const renderInProvider = (component: ReactNode) => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider
          router={createMemoryRouter([{ path: "*", element: component }])}
        />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export const ensureLoadingIsComplete = async () => {
  await waitFor(() => {
    expect(
      screen.queryByText("Loading, please wait...")
    ).not.toBeInTheDocument();
  });
};
