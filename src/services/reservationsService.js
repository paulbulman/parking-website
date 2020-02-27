import moment from "moment";

export const getReservationsData = async () => {
  const users = [
    { userId: "1", name: "Person 1" },
    { userId: "2", name: "Person 2" },
    { userId: "3", name: "Person 3" }
  ];

  const reservations = [
    {
      date: moment("2020-01-06", "YYYY-MM-DD"),
      reservations: ["1", "3", null]
    },
    {
      date: moment("2020-01-07", "YYYY-MM-DD"),
      reservations: ["1", "3", null]
    },
    {
      date: moment("2020-01-08", "YYYY-MM-DD"),
      reservations: ["1", null, null]
    },
    {
      date: moment("2019-12-30", "YYYY-MM-DD"),
      reservations: ["1", "3", null]
    },
    {
      date: moment("2019-12-31", "YYYY-MM-DD"),
      reservations: [null, "2", null]
    }
  ];

  return { users, reservations };
};

export const updateReservationsData = async reservationsData => {
  console.log("Saving reservation data", reservationsData);
};
