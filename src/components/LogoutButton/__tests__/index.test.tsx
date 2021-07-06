import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { LogoutButton } from "..";

describe("logout button", () => {
  it("calls onClick", async () => {
    const onClick = jest.fn();
    render(
      <MemoryRouter>
        <LogoutButton onClick={onClick} />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("link", { name: "Log out" }));

    expect(onClick).toHaveBeenCalled();
  });
});
