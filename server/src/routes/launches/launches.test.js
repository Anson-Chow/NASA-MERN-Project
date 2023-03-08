// const request = require("supertest");
// const app = require("../../app");
// const { 
//   mongoConnect,
//   mongoDisconnect,
//  } = require("../../services/mongo");

//  const {
//   loadPlanetsData,
//  } = require('../../models/planets.model')

// jest.setTimeout(50000)

// describe("Launches API", () => {

//   beforeAll(async () => { //runs once before all the tests in this describe block are called 
//     await mongoConnect();
//     await loadPlanetsData();
//   })

//   afterAll(async() => {
//     await mongoDisconnect()
//   })


//   describe("Test GET /launches", () => {
//     //Jest lets us use the describe and test based on its modules
//     test("It should respond with 200 success", async () => {
//       const response = await request(app) // Supertest works by taking app object, calling the listen function on that object (app), and then it allows us to make requests directly against the resulting http server.
//         .get("/v1/launches") //making a request to /launches based on the server we passed in (which is app)
//         .expect("Content-Type", /json/) // we can chain expect from supertest. regular expression syntax (/json/). Will match content type as long as it contains the word json
//         .expect(200);
//       // expect(response.statusCode).toBe(200) This is a Jest assertion. We don't need it cause we have supertest for http requests
//     }); //Just like the browser fetch function or axios library
//   });

//   describe("Test POST /launch", () => {
//     const completeLaunchData = {
//       mission: "USS Enterprise",
//       rocket: "NCC 1701-D",
//       target: "Kepler-62 f",
//       launchDate: "January 4, 2028",
//     };

//     const launchDataWithoutDate = {
//       mission: "USS Enterprise",
//       rocket: "NCC 1701-D",
//       target: "Kepler-62 f",
//     };

//     const launchDataWithInvalidDate = {
//       mission: "USS Enterprise",
//       rocket: "NCC 1701-D",
//       target: "Kepler-62 f",
//       launchDate: "Invalid Date Joe",
//     };

//     test("It should respond with 201 created", async () => {
//       const response = await request(app)
//         .post("/v1/launches")
//         .send(
//           //To send some data we can use the send function, it takes in an object that will be passed in as JSON
//           completeLaunchData
//         )
//         .expect("Content-Type", /json/)
//         .expect(201);

//       const requestDate = new Date(completeLaunchData.launchDate).valueOf();
//       const responseDate = new Date(response.body.launchDate).valueOf();
//       expect(responseDate).toBe(requestDate);

//       expect(response.body).toMatchObject(launchDataWithoutDate);
//       //toMatchObject checks that a JS object matches a subset of the properties of an object
//     });
//     test("It should catch missing required properties", async () => {
//       const response = await request(app)
//         .post("/v1/launches")
//         .send(launchDataWithoutDate)
//         .expect("Content-Type", /json/)
//         .expect(400);

//       expect(response.body).toStrictEqual({
//         //Strictly Equals another object. Check controller for the error: "Missing required launch property"
//         error: "Missing required launch property",
//       });
//     });
//     test("It should catch invalid dates", async () => {
//       const response = await request(app)
//         .post("/v1/launches")
//         .send(launchDataWithInvalidDate)
//         .expect("Content-Type", /json/)
//         .expect(400);

//       expect(response.body).toStrictEqual({
//         error: "Invalid launch date",
//       });
//     });
//   });
// });

const request = require('supertest');
const app = require('../../app');
const { 
  mongoConnect,
  mongoDisconnect,
} = require('../../services/mongo');
const {
  loadPlanetsData,
} = require('../../models/planets.model');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
  
  describe('Test POST /launch', () => {
    const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    };
  
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    };
  
    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
      launchDate: 'zoot',
    };
  
    test('It should respond with 201 created', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);
  
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);
  
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });
  
    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });
  
    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);
  
      expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
      });
    });
  });
});
