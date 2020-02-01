import React from "react";
import { shallow } from "enzyme";
import HeaderWrapper from "./../HeaderWrapper";

describe("Header wrapper component", () => {
  it("renders the unauthenticated header component when the user is not authenticated", () => {
    const component = shallow(<HeaderWrapper isAuthenticated={false} />);

    expect(component.exists("UnauthenticatedHeader")).toBe(true);
    expect(component.exists("AuthenticatedHeader")).toBe(false);
  });

  it("renders the authenticated header component when the user is authenticated", () => {
    const component = shallow(<HeaderWrapper isAuthenticated={true} />);

    expect(component.exists("AuthenticatedHeader")).toBe(true);
    expect(component.exists("UnauthenticatedHeader")).toBe(false);
  });
});
