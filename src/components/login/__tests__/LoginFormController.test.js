import React from "react";
import { mount } from "enzyme";
import LoginFormController from "./../LoginFormController";

describe("Login form controller", () => {
  it("calls the Login API with the given username and password", async () => {
    const login = jest.fn();
    const component = mount(<LoginFormController login={login} />);

    component
      .find("input[name='email']")
      .simulate("change", { target: { name: "email", value: "USER" } });
    component
      .find("input[name='password']")
      .simulate("change", { target: { name: "password", value: "PASS" } });
    component.find("form").simulate("submit");

    expect(login.mock.calls.length).toBe(1);
    expect(login.mock.calls[0][0]).toBe("USER");
    expect(login.mock.calls[0][1]).toBe("PASS");
  });
});
