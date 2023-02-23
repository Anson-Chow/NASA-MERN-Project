const { parse } = require("csv-parse");
const fs = require("fs");
const path = require('path')

const habitablePlanets = [];

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
    fs.createReadStream(path.join(__dirname, '..', '..', 'data' , "kepler_data.csv")) //stream of bytes
      .pipe(
        parse({
          comment: "#",
          columns: true, //key value pairs
        })
      ) //connects readable stream source to writable stream destination
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          // only push data if isHabitablePlanet is true
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err)
      })
      .on("end", () => {
        console.log(`Habitable planets: ${habitablePlanets.length}`);
        resolve();
      });
  });
}

function getAllPlanets(){
  return habitablePlanets;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
