import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import Week from "./Week";
import {
  getRequestsData,
  updateRequestsData
} from "./../../services/requestsService";

export default ({userId}) => {
  const [requestsData, setRequestsData] = useState([]);

  useEffect(() => {
    const loadRequestsData = async () => {
      setRequestsData(await getRequestsData(userId));
    };

    loadRequestsData();
  }, [userId]);

  const updateMany = (filterFunc, value) => {
    const dataCopy = [...requestsData];
    const requestsToUpdate = dataCopy.filter(filterFunc);
    requestsToUpdate.forEach(d => (d.requested = value));
    setRequestsData(dataCopy);
  };

  const toggle = date => {
    const currentValue = requestsData.find(d => d.date.isSame(date)).requested;
    updateMany(d => d.date.isSame(date), !currentValue);
  };

  const selectAll = () => {
    updateMany(() => true, true);
  };

  const selectNone = () => {
    updateMany(() => true, false);
  };

  const selectAllNextMonth = () => {
    const earliestDate = _.sortBy(requestsData, d => d.date)[0].date;
    updateMany(d => !d.date.isSame(earliestDate, "month"), true);
  };

  const save = async () => {
    await updateRequestsData(userId, requestsData);
  };

  const ordered = _.sortBy(requestsData, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>{<Week data={grouped[key]} onChange={toggle} />}</tr>
  ));

  return (
    <>
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
        </button>{" "}
        <button
          className="btn btn-outline-secondary"
          onClick={selectAllNextMonth}
        >
          Select all next month
        </button>{" "}
        <button className="btn btn-outline-secondary" onClick={selectNone}>
          Select none
        </button>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
      </div>
    </>
  );
};