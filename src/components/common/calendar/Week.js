import React from "react";
import moment from "moment";

const Week = ({ data, DayComponent, onChange }) => {
  const createDayCell = date => {
    const dailyData = data.find(d => d.date.isSame(date));

    const cellContent = dailyData ? (
      <DayComponent data={dailyData} onChange={() => onChange(date)} />
    ) : (
      <>&nbsp;</>
    );

    return <td key={date}>{cellContent}</td>;
  };

  const monday = moment(data[0].date).day("monday");

  const days = [...Array(5).keys()].map(k => moment(monday).add(k, "day"));

  return days.map(d => createDayCell(d));
};

export default Week;
