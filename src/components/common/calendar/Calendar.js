import React from "react";
import moment from "moment";
import _ from "lodash";
import Week from "./Week";

const Calendar = ({ data, ...rest }) => {
  const sortedData = _.sortBy(data, g => g.date);
  const weeklyData = _.groupBy(sortedData, d => moment(d.date).weekday(1));

  const weeks = Object.keys(weeklyData).map(key => (
    <tr key={key}>
      <Week data={weeklyData[key]} {...rest} />
    </tr>
  ));

  return (
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
  );
};

export default Calendar;
