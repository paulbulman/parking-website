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

  const ordered = _.sortBy(data, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const onChange = date => {
    const temp = [...data];
    const updateDate = temp.find(d => d.date.isSame(date));
    updateDate.requested = !updateDate.requested;
    setData(temp);
  };

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>{<Week data={grouped[key]} onChange={onChange} />}</tr>
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
    </>
  );
};

export default EditRequests;
