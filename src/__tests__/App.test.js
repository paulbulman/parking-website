import React from "react";
import { mount, shallow } from "enzyme";
import * as authenticationStatusEnum from "../redux/reducers/authenticationStatus";
import { App } from "./../App";

describe("App component", () => {
  it("refreshes the authentication status on initial load", () => {
    const refreshAuthenticationStatus = jest.fn();

    mount(
      <App
        authenticationStatus={authenticationStatusEnum.UNKNOWN}
        refreshAuthenticationStatus={refreshAuthenticationStatus}
      />
    );

    expect(refreshAuthenticationStatus.mock.calls.length).toBe(1);
  });

  const mountComponent = authenticationStatus =>
    shallow(
      <App
        authenticationStatus={authenticationStatus}
        refreshAuthenticationStatus={jest.fn()}
      />
    );

  it("renders the loading component when the authentication status is unknown", () => {
    const component = mountComponent(authenticationStatusEnum.UNKNOWN);

    expect(component.exists("Loading")).toBe(true);

    expect(component.exists("HeaderWrapper")).toBe(false);
    expect(component.exists("BodyWrapper")).toBe(false);
  });

  it("renders the wrapper components with the appropriate isAuthenticated status otherwise", () => {
    const checkIsAuthenticated = (
      authenticationStatus,
      expectedIsAuthenticated
    ) => {
      const component = mountComponent(authenticationStatus);

      expect(component.exists("HeaderWrapper")).toBe(true);
      expect(component.exists("BodyWrapper")).toBe(true);

      expect(component.children("HeaderWrapper").props().isAuthenticated).toBe(
        expectedIsAuthenticated
      );
      expect(component.children("BodyWrapper").props().isAuthenticated).toBe(
        expectedIsAuthenticated
      );

      expect(component.exists("Loading")).toBe(false);
    };

    checkIsAuthenticated(authenticationStatusEnum.AUTHENTICATED, true);
    checkIsAuthenticated(authenticationStatusEnum.NOT_AUTHENTICATED, false);
  });
});
