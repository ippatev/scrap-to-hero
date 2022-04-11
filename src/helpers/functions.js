const path = require("path");

const public_path = (filename = "") =>
  path.join(__dirname, "..", "..", filename);

module.exports = { public_path };
