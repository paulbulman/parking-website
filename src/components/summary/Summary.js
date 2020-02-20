import React, { useEffect, useState } from "react";
import Week from "./Week";
import { getSummaryData } from "./../../services/summaryService";

import "./summary.css";

const Summary = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const loadSummaryData = async () => {
      setSummaryData(await getSummaryData());
    };

    loadSummaryData();
  }, []);

  const weeks = Object.keys(summaryData).map(key => (
    <tr key={key}>
      <Week data={summaryData[key]} />
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
