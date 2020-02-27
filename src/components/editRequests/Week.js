import React from "react";
import moment from "moment";

import Day from "./Day";

export default ({ data, onChange }) => {
  const createDayCell = date => {
    const singleDayData = data.find(d => d.date.isSame(date));

    return (
      <td key={date}>
        {singleDayData ? (
          <Day data={singleDayData} onChange={onChange} />
        ) : (
          <>&nbsp;</>
        )}
      </td>
    );
  };

  const monday = moment(data[0].date).day("monday");

  const days = [...Array(5).keys()].map(k => moment(monday).add(k, "day"));

  return days.map(d => createDayCell(d));
};
