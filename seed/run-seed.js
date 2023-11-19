const data = require("../data");
const seed = require("./seed");
const db = require("../connection");

seed(data).then(() => {
  return db.end();
});
