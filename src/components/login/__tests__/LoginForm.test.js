import React from "react";
import { mount } from "enzyme";
import LoginForm from "../LoginForm";

describe("Login form", () => {
  const mountComponent = ({
    email = "",
    password = "",
    errorMessage = "",
    onChange = jest.fn(),
    onLogin = jest.fn()
  }) => {
    return mount(
      <LoginForm
        email={email}
        password={password}
        errorMessage={errorMessage}
        onChange={onChange}
        onLogin={onLogin}
      />
    );
  };

  it("displays email passed from the parent component", () => {
    const component = mountComponent({ email: "EMAIL" });
    const renderedEmail = component.find("input#input_email");
    expect(renderedEmail.prop("value")).toBe("EMAIL");
  });

  it("displays password passed from the parent component", () => {
    const component = mountComponent({ password: "PASS" });
    const renderedPassword = component.find("input#input_password");
    expect(renderedPassword.prop("value")).toBe("PASS");
  });

  it("displays error messasges passed from the parent component", () => {
    const component = mountComponent({ errorMessage: "ERROR" });
    const renderedErrorMessage = component.find("div.text-danger");
    expect(renderedErrorMessage.text()).toBe("ERROR");
  });

  it("propagates email changes to the parent component", () => {
    const onChange = jest.fn();
    const component = mountComponent({ onChange });

    const emailInput = component.find("input[name='email']");
    emailInput.simulate("change", { target: { name: "email", value: "USER" } });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe("email");
    expect(onChange.mock.calls[0][1]).toBe("USER");
  });

  it("propagates password changes to the parent component", () => {
    const onChange = jest.fn();
    const component = mountComponent({ onChange });

    const passwordInput = component.find("input[name='password']");
    passwordInput.simulate("change", {
      target: { name: "password", value: "PASS" }
    });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe("password");
    expect(onChange.mock.calls[0][1]).toBe("PASS");
  });

  it("propagates login event to the parent component", () => {
    const onLogin = jest.fn();
    const component = mountComponent({ onLogin });

    component.find("form").simulate("submit");

    expect(onLogin.mock.calls.length).toBe(1);
  });
});
