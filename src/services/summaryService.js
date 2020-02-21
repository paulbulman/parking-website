import moment from "moment";

export const getSummaryData = async userId => [
  {
    date: moment("2020-01-06", "YYYY-MM-DD"),
    allocated: ["06 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-09", "YYYY-MM-DD"),
    allocated: ["09 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-10", "YYYY-MM-DD"),
    allocated: ["10 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2019-12-30", "YYYY-MM-DD"),
    allocated: ["30 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2019-12-31", "YYYY-MM-DD"),
    allocated: ["31 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-01", "YYYY-MM-DD"),
    allocated: ["01 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-02", "YYYY-MM-DD"),
    allocated: ["02 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-07", "YYYY-MM-DD"),
    allocated: ["07 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  },
  {
    date: moment("2020-01-03", "YYYY-MM-DD"),
    allocated: ["03 Person 1", "Person 2"],
    interrupted: ["Person 3"],
    highlight: "Person 1"
  }
];
