import React from "react";
import { useParams } from "react-router-dom";

export default () => {
  const { userId } = useParams();

  return <div>{`Edit user ${userId}`}</div>;
};
