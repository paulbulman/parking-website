import React, { useState } from "react";
import moment from "moment";
import _ from "lodash";
import Week from "./Week";

const EditRequests = () => {
  const initialData = [
    { date: moment("2020-01-06", "YYYY-MM-DD"), requested: true },
    { date: moment("2020-01-07", "YYYY-MM-DD"), requested: false },
    { date: moment("2020-01-08", "YYYY-MM-DD"), requested: true },
    { date: moment("2020-01-02", "YYYY-MM-DD"), requested: true },
    { date: moment("2019-12-30", "YYYY-MM-DD"), requested: true },
    { date: moment("2019-12-31", "YYYY-MM-DD"), requested: false }
  ];

  const [data, setData] = useState(initialData);

  const updateMany = (filterFunc, value) => {
    const dataCopy = [...data];
    const requestsToUpdate = dataCopy.filter(filterFunc);
    requestsToUpdate.forEach(d => (d.requested = value));
    setData(dataCopy);
  };

  const toggle = date => {
    const currentValue = data.find(d => d.date.isSame(date)).requested;
    updateMany(d => d.date.isSame(date), !currentValue);
  };

  const selectAll = () => {
    updateMany(() => true, true);
  };

  const selectNone = () => {
    updateMany(() => true, false);
  };

  const selectAllNextMonth = () => {
    const earliestDate = _.sortBy(data, d => d.date)[0].date;
    updateMany(d => !d.date.isSame(earliestDate, "month"), true);
  };

  const ordered = _.sortBy(data, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>{<Week data={grouped[key]} onChange={toggle} />}</tr>
  ));

  return (
    <>
      <h2>Edit Requests</h2>
      <h4>Edit requests up to the end of next month:</h4>
      <hr />
      <table className="table table-top table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
      <div className="form-group">
        <button className="btn btn-outline-secondary" onClick={selectAll}>
          Select all
        </button>
        {' '}
        <button
          className="btn btn-outline-secondary"
          onClick={selectAllNextMonth}
        >
          Select all next month
        </button>
        {' '}
        <button className="btn btn-outline-secondary" onClick={selectNone}>
          Select none
        </button>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={() => alert("save")}>
          Save
        </button>
      </div>
    </>
  );
};

export default EditRequests;
