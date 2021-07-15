import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "..";

describe("login form", () => {
  it("calls onSubmit with the given values", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    userEvent.type(screen.getByLabelText("Email"), "someone@example.com");
    userEvent.type(screen.getByLabelText("Password"), "secret");
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

    const passwordInput = screen.getByLabelText("Password");

    userEvent.type(screen.getByLabelText("Email"), "someone@example.com");
    userEvent.type(passwordInput, "secret");
    userEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(passwordInput).toHaveValue("");
    });
  });

  it("temporarily disables controls whilst form is submitting", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    expect(emailInput).toBeEnabled();
    expect(passwordInput).toBeEnabled();
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
    });

    await waitFor(() => {
      expect(emailInput).toBeEnabled();
      expect(passwordInput).toBeEnabled();
    });
  });
});
