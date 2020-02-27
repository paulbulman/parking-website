import React from "react";

export default ({ data, onChange }) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={data.requested}
        onChange={() => onChange(data.date)}
      />{" "}
      {data.date.format("DD MMM")}
    </label>
  </>
);
