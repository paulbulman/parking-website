import React, { useEffect, useState } from "react";
import _ from "lodash";
import Calendar from "../common/calendar/Calendar";
import Day from "./Day";
import {
  getRequestsData,
  updateRequestsData
} from "./../../services/requestsService";

const EditRequests = () => {
  const userId = "USER_ID";

  const [requestsData, setRequestsData] = useState([]);

  useEffect(() => {
    const loadRequestsData = async () => {
      setRequestsData(await getRequestsData(userId));
    };

    loadRequestsData();
  }, []);

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

  return (
    <>
      <h2>Edit Requests</h2>
      <h4>Edit requests up to the end of next month:</h4>
      <hr />

      <Calendar data={requestsData} DayComponent={Day} onChange={toggle} />

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

export default EditRequests;
