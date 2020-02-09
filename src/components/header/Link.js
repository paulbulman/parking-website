import React from "react";
import { Link as ReactLink } from "react-router-dom";

const Link = ({ to, caption }) => (
  <ReactLink className="nav-link text-dark" to={to}>
    {caption}
  </ReactLink>
);

export default Link;
