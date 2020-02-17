import React from "react";
import moment from "moment";

import Day from "./Day";

const Week = ({ data }) => {
  const createDayCell = (data, date) => {
    const dayData = data.find(d => d.date.isSame(date));

    return <td key={date}>{dayData ? <Day data={dayData} /> : null}</td>;
  };

  const monday = moment(data[0].date).day("monday");

  return [...Array(5).keys()].map(k =>
    createDayCell(data, moment(monday).add(k, "day"))
  );
};

export default Week;
