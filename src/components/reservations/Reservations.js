import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import { getReservationsData } from "./../../services/reservationsService";
import Week from "./Week";

const Reservations = () => {
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    const loadReservationsData = async () => {
      setReservationsData(await getReservationsData());
    };

    loadReservationsData();
  }, []);

  const ordered = _.sortBy(reservationsData.reservations, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>
      <Week data={grouped[key]} users={reservationsData.users} />
    </tr>
  ));

  return (
    <>
      <h2>Edit Reservations</h2>
      <h4>Edit reservations up to the end of next month:</h4>
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

export default Reservations;
