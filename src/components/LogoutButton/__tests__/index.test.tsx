import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogoutButton } from "..";

describe("logout button", () => {
  it("calls onClick", async () => {
    const onClick = jest.fn();
    render(<LogoutButton onClick={onClick} />);

    userEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(onClick).toHaveBeenCalled();
  });
});
