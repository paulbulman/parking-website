const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());

app.get("/registrationNumbers", (req, res) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const response = [
    { registrationNumber: "AB123CDE", name: "Person 1" },
    { registrationNumber: "X789XZ", name: "Person 2" }
  ];

  res.send(response);
});

app.listen(port, () => console.log(`Mock API server running on port ${port}`));
