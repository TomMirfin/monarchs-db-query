const express = require("express");
const { getAllMonarchs } = require("./controllers/monarchs.controller");

const app = express();

app.use(express.json());

app.get("/api/monarchs", getAllMonarchs);

module.exports = app;
