import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChangePasswordForm } from "..";

describe("change password form", () => {
  it("calls onSubmit with the given values", async () => {
    const onSubmit = jest.fn();
    render(<ChangePasswordForm onSubmit={onSubmit} />);

    userEvent.type(screen.getByLabelText(/^Password$/i), "__PASSWORD__");
    userEvent.type(
      screen.getByLabelText(/Confirm password/i),
      "__CONFIRM_PASSWORD__"
    );
    userEvent.click(screen.getByRole("button", { name: "Set new password" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        password: "__PASSWORD__",
        confirmPassword: "__CONFIRM_PASSWORD__",
      });
    });
  });

  it("clears passwords after form is submitted", async () => {
    render(<ChangePasswordForm onSubmit={jest.fn()} />);

    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/i);

    userEvent.type(passwordInput, "__PASSWORD__");
    userEvent.type(confirmPasswordInput, "__CONFIRM_PASSWORD__");

    userEvent.click(screen.getByRole("button", { name: "Set new password" }));

    await waitFor(() => {
      expect(passwordInput).toHaveValue("");
      expect(confirmPasswordInput).toHaveValue("");
    });
  });
});
