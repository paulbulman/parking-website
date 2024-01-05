import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChangePasswordForm } from "..";

describe("change password form", () => {
  it("calls onSubmit with the given values", async () => {
    const onSubmit = jest.fn();
    render(<ChangePasswordForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText("Password"), "__PASSWORD__");
    await userEvent.type(
      screen.getByLabelText("Confirm password"),
      "__CONFIRM_PASSWORD__"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Set new password" })
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        password: "__PASSWORD__",
        confirmPassword: "__CONFIRM_PASSWORD__",
      });
    });
  });

  it("clears passwords after form is submitted", async () => {
    render(<ChangePasswordForm onSubmit={jest.fn()} />);

    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");

    await userEvent.type(passwordInput, "__PASSWORD__");
    await userEvent.type(confirmPasswordInput, "__CONFIRM_PASSWORD__");

    await userEvent.click(
      screen.getByRole("button", { name: "Set new password" })
    );

    await waitFor(() => {
      expect(passwordInput).toHaveValue("");
      expect(confirmPasswordInput).toHaveValue("");
    });
  });
});
