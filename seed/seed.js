const db = require("../connection");
const format = require("pg-format");
const monarchData = require("../data/monarchData");
const monarchFacts = require("../data/monarch-facts");

function seed() {
  return db
    .query(`DROP TABLE IF EXISTS monarchs;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS facts;`);
    })
    .then(() => {
      return createMonarchs();
    })
    .then(() => {
      return createFacts();
    })
    .then(() => {
      return insertMonarchs(monarchData);
    })
    .then(({ rows: monarchData }) => {
      return insertFacts(monarchData, monarchFacts);
    });
}

function createMonarchs() {
  return db.query(`CREATE TABLE monarchs 
  (monarch_id SERIAL PRIMARY KEY,
    monarch_name VARCHAR(50), 
    family VARCHAR(50), 
    yearOfRule VARCHAR(100) )`);
}

function insertMonarchs(monarchData) {
  const formattedMonarchs = monarchData.map((monarch) => {
    const { name, family, yearOfRule } = monarch;
    return [name, family, yearOfRule];
  });
  const queryMonarchs = format(
    `INSERT INTO monarchs(monarch_name, family, yearOfRule)
  VALUES %L RETURNING *
  `,
    formattedMonarchs
  );

  return db.query(queryMonarchs);
}

function createFacts() {
  return db.query(`
    CREATE TABLE facts (
      fact_id SERIAL PRIMARY KEY,
      fact_title VARCHAR,
      fact_description TEXT
    );
  `);
}

function insertFacts(monarchfacts, monarchData) {
  const formattedFact = prepareFact(monarchfacts, monarchData);
  const queryMonarchs = format(
    `INSERT INTO facts( fact_id, fact_title, fact_description)
    VALUES %L RETURNING *
    `,
    formattedFact
  );

  return db.query(queryMonarchs);
}

function prepareFact(monarchData, monarchFacts) {
  const formattedMonarch = createMonarchReference(monarchData);

  const mappedFacts = monarchFacts.map((facts) => {
    const { name, fact } = facts;
    return [formattedMonarch[name], name, fact];
  });
  return mappedFacts;
}

function createMonarchReference(monarchData) {
  const addID = {};
  monarchData.forEach((monarch) => {
    addID[monarch.monarch_name] = monarch.monarch_id;
  });

  return addID;
}

module.exports = seed;
