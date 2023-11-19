const { selectMonarchs } = require("../model/monarchs.model");

exports.getAllMonarchs = (req, res) => {
  selectMonarchs().then((monarchs) => {
    res.status(200).send(monarchs);
  });
};
