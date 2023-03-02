const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const planets = require("./planets.mongo");

// const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" && //status of the planet
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 && //stellar flux - amount of light
    planet["koi_prad"] < 1.6
  ); //Planetary Radius
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    ) //stream of bytes
      .pipe(
        parse({
          comment: "#",
          columns: true, //key value pairs
        })
      ) //connects readable stream source to writable stream destination
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // only push data if isHabitablePlanet is true
          // habitablePlanets.push(data);
          savePlanet(data); //pass in data from our csv files to our save planet function
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        // console.log(`Habitable planets: ${habitablePlanets.length}`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}); //find is a filter from mongo. We're not looking for a specific planet, we're looking for all of them
} //So it is fine to just pass in an empty object as the argument

async function savePlanet(planet) {
  try {
    // insert + update = upsert. Basically inserting only when the object does not exist. Upsert inserts data into a collection if it doesn't already exist. If that document does exist, then it updates that document by what u pass into the upsert operation
    await planets.updateOne(
      {
        //In our server we are calling loadPlanetsData() on mount, so if we have clusters it would repeat for every call and store it execessively in our database
        kepler_name: planet.kepler_name, //if this planet already exists, updateone wont do anything
      },
      {
        kepler_name: planet.kepler_name, //the update, but won't change anything basically
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
