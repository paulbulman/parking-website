import React from "react";

const Day = ({ data }) => {
  const createNames = (names, highlight) =>
    names.map(n =>
      n === highlight ? (
        <li key={n} className="highlighted">
          {n}
        </li>
      ) : (
        <li key={n}>{n}</li>
      )
    );

  return (
    <>
      <p className="day-header">{data.date.format("DD MMM")}</p>
      <ul className="names-list">
        {createNames(data.allocated, data.highlight)}
      </ul>
      <ul className="names-list interruption">
        {createNames(data.interrupted, data.highlight)}
      </ul>
    </>
  );
};

export default Day;
