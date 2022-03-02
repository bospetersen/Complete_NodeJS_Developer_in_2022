const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Testing launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  })
  afterAll(async () => {
    await mongoDisconnect();
  })

  describe("Test GET /launches", () => {
    test("It should respond with status 200 success", async () => {
      const response = await request(app)
        .get(`/${process.env.API_VERSION}/launches`)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {

    const compleateLaunchData = {
      "mission": "SXM-7",
      "rocket": "Falcon 9",
      "target": "Kepler-62 f",
      "launchDate": "January 4, 2028"
    }

    const launchDataWithoutDate = {
      "mission": "SXM-7",
      "rocket": "Falcon 9",
      "target": "Kepler-62 f"
    }
    const launchDataWithInvalidDate = {
      "mission": "SXM-7",
      "rocket": "Falcon 9",
      "target": "Kepler-62 f",
      "launchDate": "NotADate"
    }


    test("It should respond with status 201 created", async () => {
      const response = await request(app)
        .post(`/${process.env.API_VERSION}/launches`)
        .send(compleateLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(compleateLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing requred properties", async () => {
      const response = await request(app)
        .post(`/${process.env.API_VERSION}/launches`)
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Missing required launch property"
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post(`/${process.env.API_VERSION}/launches`)
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body).toStrictEqual({
        error: "Invalid launch date"
      });
    });
  });
});
