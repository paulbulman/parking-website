import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import Week from "./Week";
import { getCurrentUserId } from "../../services/authenticationService";
import { getSummaryData } from "./../../services/summaryService";

const Summary = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const loadSummaryData = async () => {
      const userId = await getCurrentUserId();
      setSummaryData(await getSummaryData(userId));
    };

    loadSummaryData();
  }, []);

  const ordered = _.sortBy(summaryData, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>
      <Week data={grouped[key]} />
    </tr>
  ));

  return (
    <>
      <h2>Summary</h2>
      <h4>Requests up to the end of next month:</h4>
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

export default Summary;
