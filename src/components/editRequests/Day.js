import React from "react";

const Day = ({ data, onChange }) => {
  return (
    <>
      <label>
        <input type="checkbox" checked={data.requested} onChange={onChange} />
        {` `}
        {data.date.format("DD MMM")}
      </label>
    </>
  );
};

export default Day;
