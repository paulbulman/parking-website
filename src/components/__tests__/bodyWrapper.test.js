import React from "react";
import { shallow } from "enzyme";
import BodyWrapper from "../BodyWrapper";

describe("Body wrapper component", () => {
  it("renders the unauthenticated router component when the user is not authenticated", () => {
    const component = shallow(<BodyWrapper isAuthenticated={false} />);

    expect(component.exists("UnauthenticatedRouter")).toBe(true);
    expect(component.exists("AuthenticatedRouter")).toBe(false);
  });

  it("renders the authenticated router component when the user is authenticated", () => {
    const component = shallow(<BodyWrapper isAuthenticated={true} />);

    expect(component.exists("AuthenticatedRouter")).toBe(true);
    expect(component.exists("UnauthenticatedRouter")).toBe(false);
  });
});
