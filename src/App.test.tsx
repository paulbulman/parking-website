import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  const linkElement = screen.getByText(/Temporarily unavailable/i);
  expect(linkElement).toBeInTheDocument();
});
