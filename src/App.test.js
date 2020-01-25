import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Log in header", () => {
  const { getAllByText } = render(<App />);
  const headerElement = getAllByText("Log in")[0];
  expect(headerElement).toBeInTheDocument();
});
