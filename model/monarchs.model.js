const db = require("../connection");

exports.selectMonarchs = () => {
  console.log("in the model");
  return db.query("SELECT * FROM monarchs;").then((res) => {
    return res.rows;
  });
};
