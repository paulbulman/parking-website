const express = require("express");
const cors = require("cors");
const app = express();
const textBody = require("body");

const port = 4000;

app.use(cors());

const checkAuthorizationHeader = (req, res) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    res.sendStatus(401);
  }

  return authorization;
};

app.get("/registrationNumbers", (req, res) => {
  if (!checkAuthorizationHeader(req, res)) {
    return;
  }

  const response = [
    { registrationNumber: "AB123CDE", name: "Person 1" },
    { registrationNumber: "X789XZ", name: "Person 2" }
  ];

  res.send(response);
});

app.get("/requests/:userId", (req, res) => {
  if (!checkAuthorizationHeader(req, res)) {
    return;
  }

  const response = [
    { date: "2020-01-06", requested: true },
    { date: "2020-01-07", requested: false },
    { date: "2020-01-08", requested: true },
    { date: "2020-01-02", requested: true },
    { date: "2019-12-30", requested: true },
    { date: "2019-12-31", requested: false }
  ];

  res.send(response);
});

app.post("/requests/:userId", (req, res) => {
  textBody(req, res, function(err, body) {
    if (!checkAuthorizationHeader(req, res)) {
      return;
    }

    console.log("Saving requests data for user", req.params["userId"], body);

    res.send("Requests saved successfully");
  });
});

app.get("/reservations", (req, res) => {
  if (!checkAuthorizationHeader(req, res)) {
    return;
  }

  const response = [
    {
      date: "2020-01-06",
      reservations: ["1", "3", null]
    },
    {
      date: "2020-01-07",
      reservations: ["1", "3", null]
    },
    {
      date: "2020-01-08",
      reservations: ["1", null, null]
    },
    {
      date: "2019-12-30",
      reservations: ["1", "3", null]
    },
    {
      date: "2019-12-31",
      reservations: [null, "2", null]
    }
  ];

  res.send(response);
});

app.post("/reservations", (req, res) => {
  textBody(req, res, function(err, body) {
    if (!checkAuthorizationHeader(req, res)) {
      return;
    }

    console.log("Saving reservations", body);

    res.send("Reservations saved successfully");
  });
});

app.get("/users", (req, res) => {
  if (!checkAuthorizationHeader(req, res)) {
    return;
  }

  const response = [
    { userId: "1", name: "Person 1" },
    { userId: "2", name: "Person 2" },
    { userId: "3", name: "Person 3" }
  ];

  res.send(response);
});

app.listen(port, () => console.log(`Mock API server running on port ${port}`));
