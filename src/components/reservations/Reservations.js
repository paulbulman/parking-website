import React, { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import {
  getReservationsData,
  updateReservationsData
} from "./../../services/reservationsService";
import Week from "./Week";

export default () => {
  const [reservationsData, setReservationsData] = useState({});

  useEffect(() => {
    const loadReservationsData = async () => {
      setReservationsData(await getReservationsData());
    };

    loadReservationsData();
  }, []);

  const update = (date, reservationIndex, selectedUserId) => {
    const dataCopy = [...reservationsData.reservations];

    const dataToUpdate = dataCopy.find(r => r.date.isSame(date));
    const newValue = selectedUserId === "" ? null : selectedUserId;

    dataToUpdate.reservations[reservationIndex] = newValue;

    const updated = {
      users: reservationsData.users,
      reservations: dataCopy
    };

    setReservationsData(updated);
  };

  const save = async () => {
    await updateReservationsData(reservationsData.reservations);
  };

  const ordered = _.sortBy(reservationsData.reservations, g => g.date);
  const grouped = _.groupBy(ordered, d => moment(d.date).weekday(1));

  const weeks = Object.keys(grouped).map(key => (
    <tr key={key}>
      <Week
        data={grouped[key]}
        users={reservationsData.users}
        onChange={update}
      />
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
      <div className="form-group">
        <button className="btn btn-primary" onClick={save}>
          Save
        </button>
      </div>
    </>
  );
};
