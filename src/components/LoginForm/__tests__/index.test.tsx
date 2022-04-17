import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "..";

describe("login form", () => {
  it("calls onSubmit with the given values", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Email"), "someone@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "secret");
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));

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

    await userEvent.type(screen.getByLabelText("Email"), "someone@example.com");
    await userEvent.type(passwordInput, "secret");
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(passwordInput).toHaveValue("");
    });
  });
});
