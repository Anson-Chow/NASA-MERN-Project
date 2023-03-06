const http = require("http");

require('dotenv').config() //populates our PORT with what is in our .env file

const app = require("./app");
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect() //We want to connect to Mongo before our server starts listening so that all our data is available when we start handling requests. Returns a promise so we have to await
  await loadPlanetsData(); //Populate our server with data before it loads 
  await loadLaunchData();

  server.listen(PORT, () => { //listen starts the server
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
