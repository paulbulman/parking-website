if (process.env.NODE_ENV === "production") {
  module.exports = require("./authenticationApi.prod");
} else {
  module.exports = require("./authenticationApi.dev");
}
