import React, { useEffect, useState } from "react";
import Calendar from './../common/calendar/Calendar';
import Day from './Day';
import { getSummaryData } from "./../../services/summaryService";

import "./summary.css";

const Summary = () => {
  const userId = "USER_ID";

  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const loadSummaryData = async () => {
      setSummaryData(await getSummaryData(userId));
    };

    loadSummaryData();
  }, []);

  return (
    <>
      <h2>Summary</h2>
      <h4>Requests up to the end of next month:</h4>
      <hr />
      <Calendar data={summaryData} DayComponent={Day} />
    </>
  );
};

export default Summary;
