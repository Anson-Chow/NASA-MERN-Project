const mongoose = require("mongoose");

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL; //We use mongoose to connect to our mongoDB database

mongoose.connection.once("open", () => {
  //mongoose.connection is an event emitter so we can use the on function. The once function triggers the callback once.
  console.log("MongoDB connection ready!");
});

// mongoose.set("strictQuery", false); // Was getting a warning, implemented this based on what stackOverflow said

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  //we want to disconnect from mongo after our tests are run
  await mongoose.disconnect();
}
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
