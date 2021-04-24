import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "..";

describe("login form", () => {
  it("calls onSubmit with the given values", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    userEvent.type(screen.getByLabelText(/Email/i), "someone@example.com");
    userEvent.type(screen.getByLabelText(/Password/i), "secret");
    userEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "someone@example.com",
        password: "secret",
      });
    });
  });

  it("clears password after form is submitted", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByLabelText(/Password/i);

    userEvent.type(screen.getByLabelText(/Email/i), "someone@example.com");
    userEvent.type(passwordInput, "secret");
    userEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(passwordInput).toHaveValue("");
    });
  });

  it("temporarily disables controls and changes button text whilst form is submitting", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: "Log in" });

    expect(emailInput).toBeEnabled();
    expect(passwordInput).toBeEnabled();
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(loginButton).toBeDisabled();
      expect(loginButton).toHaveTextContent("Logging in");
    });

    await waitFor(() => {
      expect(emailInput).toBeEnabled();
      expect(passwordInput).toBeEnabled();
      expect(loginButton).toBeEnabled();
      expect(loginButton).toHaveTextContent("Log in");
    });
  });
});
