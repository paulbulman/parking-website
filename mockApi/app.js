const express = require("express");
const cors = require("cors");
const fs = require("fs");
const textBody = require("body");

const app = express();
const dataPath = "./mockApi/data.json";
const port = 4000;

let data = {};

const updateData = () => {
  const content = fs.readFileSync(dataPath);

  if (content.length) {
    data = JSON.parse(content);
  }
};

updateData();

fs.watch(dataPath, { encoding: "buffer" }, updateData);

app.use(cors());

const checkAuthorizationHeader = (req, res) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    res.sendStatus(401);
  }

  return authorization;
};

const handleGet = (req, res, key) => {
  if (!checkAuthorizationHeader(req, res)) {
    return;
  }

  res.send(data[key]);
};

const handlePost = (req, res, message, ...rest) => {
  textBody(req, res, function(err, body) {
    if (!checkAuthorizationHeader(req, res)) {
      return;
    }

    console.log(message, ...rest, body);

    res.send(`${message} completed succesfully`);
  });
};

app.get("/profile/:userId", (req, res) => {
  handleGet(req, res, "profile");
});
app.post("/profile/:userId", (req, res) => {
  handlePost(req, res, "Saving profile data", req.params["userId"]);
});

app.get("/registrationNumbers", (req, res) => {
  handleGet(req, res, "registrationNumbers");
});

app.get("/requests/:userId", (req, res) => {
  handleGet(req, res, "requests");
});
app.post("/requests/:userId", (req, res) => {
  handlePost(req, res, "Saving requests data", req.params["userId"]);
});

app.get("/reservations", (req, res) => {
  handleGet(req, res, "reservations");
});
app.post("/reservations", (req, res) => {
  handlePost(req, res, "Saving reservations");
});

app.get("/summary/:userId", (req, res) => {
  handleGet(req, res, "summary");
});

app.get("/users", (req, res) => {
  handleGet(req, res, "users");
});

app.listen(port, () => console.log(`Mock API server running on port ${port}`));
