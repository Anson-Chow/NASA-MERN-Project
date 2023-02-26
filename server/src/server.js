const http = require("http");
const mongoose = require('mongoose')

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:qX4ciaDgNwlR0fPp@nasaproject.iqot7fx.mongodb.net/?retryWrites=true&w=majority' //We use mongoose to connect to our mongoDB database

const server = http.createServer(app);

mongoose.connection.once('open', () => { //mongoose.connection is an event emitter so we can use the on function. The once function triggers the callback once. 
  console.log('MongoDB connection ready!')
})

mongoose.set("strictQuery", false); // Was getting a warning, implemented this based on what stackOverflow said

mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function startServer() {
  await mongoose.connect(MONGO_URL) //We want to connect to Mongo before our server starts listening so that all our data is available when we start handling requests. Returns a promise so we have to await
  await loadPlanetsData(); //Populate our server with data before it loads 

  server.listen(PORT, () => { //listen starts the server
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
