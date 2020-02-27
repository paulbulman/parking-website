import React from "react";
import moment from "moment";

import Day from "./Day";

export default ({ data, users, onChange }) => {
  const createDayCell = date => {
    const singleDayData = data.find(d => d.date.isSame(date));

    return (
      <td key={date.toString()}>
        {singleDayData ? (
          <Day data={singleDayData} users={users} onChange={onChange} />
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
