import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { CreateLoginFormController } from "./../LoginFormController";

describe("Login form controller", () => {
  const createComponent = loginResult => {
    const login = jest.fn().mockResolvedValue(loginResult);
    const LoginFormController = CreateLoginFormController(login);

    const markAsAuthenticated = jest.fn();
    const markAsNotAuthenticated = jest.fn();
    const component = mount(
      <LoginFormController
        markAsAuthenticated={markAsAuthenticated}
        markAsNotAuthenticated={markAsNotAuthenticated}
      />
    );

    return { login, markAsAuthenticated, markAsNotAuthenticated, component };
  };

  const submitForm = async component => {
    await act(async () => {
      component.find("form").simulate("submit");
    });
  };

  it("calls the Login API with the given username and password", async () => {
    const { login, component } = createComponent("SUCCESS");

    component
      .find("input[name='email']")
      .simulate("change", { target: { name: "email", value: "USER" } });
    component
      .find("input[name='password']")
      .simulate("change", { target: { name: "password", value: "PASS" } });

    await submitForm(component);

    expect(login.mock.calls.length).toBe(1);
    expect(login.mock.calls[0][0]).toBe("USER");
    expect(login.mock.calls[0][1]).toBe("PASS");
  });

  it("marks the user as authenticated when the login API returns success", async () => {
    const { markAsAuthenticated, component } = createComponent("SUCCESS");
    await submitForm(component);
    expect(markAsAuthenticated.mock.calls.length).toBe(1);
  });

  it("marks the user as not authenticated when the login API returns failure", async () => {
    const { markAsNotAuthenticated, component } = createComponent("FAILURE");
    await submitForm(component);
    expect(markAsNotAuthenticated.mock.calls.length).toBe(1);
  });
});
