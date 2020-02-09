import React from "react";
import Day from "./Day";

const Week = ({ data }) => (
  <>
    {data.map(d => (
      <td key={d.date}>
        <Day data={d} />
      </td>
    ))}
  </>
);

export default Week;
