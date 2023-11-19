// /Users/username/project-folder/__tests__/app.test.js
const seed = require("../seed/seed");
const testData = require("../testing-endpoints/test-data");

const app = require("../app");
const db = require("../connection");
const request = require("supertest");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("GET api/monarchs", () => {
  test("api responds with 200 status code", () => {
    return request(app).get("/api/monarchs").expect(200);
  });

  test("200: successful test should respond with a single monarch object", () => {
    return request(app)
      .get("/api/monarchs")
      .expect(200)
      .then(({ body }) => {
        console.log(body[0].monarch_name, "<--- body");
        expect(body[0]).toMatchObject({
          family: "Norman",
          monarch_id: 1,
          monarch_name: "William the Conqueror",
          yearofrule: "1066–1087",
        });
      });
  });
});
