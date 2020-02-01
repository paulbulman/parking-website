import React from "react";
import { shallow } from "enzyme";
import BodyWrapper from "../BodyWrapper";

describe("Body wrapper component", () => {
  it("renders the login form when the user is not authenticated", () => {
    const component = shallow(<BodyWrapper isAuthenticated={false} />);

    expect(component.exists("LoginFormWrapper")).toBe(true);
    expect(component.exists("Router")).toBe(false);
  });

  it("renders the router component when the user is authenticated", () => {
    const component = shallow(<BodyWrapper isAuthenticated={true} />);

    expect(component.exists("Router")).toBe(true);
    expect(component.exists("LoginFormWrapper")).toBe(false);
  });
});
