const { Pool } = require("pg");

const db = new Pool();

const ENV = process.env.NODE_ENV || "development";
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;
console.log(pathToEnvFile, "<--- correct path?");
require("dotenv").config({ path: pathToEnvFile });
const PGDATABASE = process.env.PGDATABASE;

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = db;

console.log(`the node environment is ... ${ENV}`);
console.log(`the path is ${pathToEnvFile}`);
console.log(`the database is ${PGDATABASE}`);
