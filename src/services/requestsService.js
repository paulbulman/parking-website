import moment from "moment";

export const getRequestsData = async userId => [
  { date: moment("2020-01-06", "YYYY-MM-DD"), requested: true },
  { date: moment("2020-01-07", "YYYY-MM-DD"), requested: false },
  { date: moment("2020-01-08", "YYYY-MM-DD"), requested: true },
  { date: moment("2020-01-02", "YYYY-MM-DD"), requested: true },
  { date: moment("2019-12-30", "YYYY-MM-DD"), requested: true },
  { date: moment("2019-12-31", "YYYY-MM-DD"), requested: false }
];

export const updateRequestsData = async (userId, requestsData) => {
  console.log("Saving requests data for user", userId, requestsData);
};
