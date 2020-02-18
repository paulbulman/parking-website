import React from "react";
import moment from "moment";

import Day from "./Day";

const Week = ({ data }) => {
  const createDayCell = date => {
    const singleDayData = data.find(d => d.date.isSame(date));

    return (
      <td key={date}>
        {singleDayData ? <Day data={singleDayData} /> : <>&nbsp;</>}
      </td>
    );
  };

  const monday = moment(data[0].date).day("monday");

  const days = [...Array(5).keys()].map(k => moment(monday).add(k, "day"));

  return days.map(d => createDayCell(d));
};

export default Week;
