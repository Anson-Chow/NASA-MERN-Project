const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body; // Our express.json() middleware parses the json and populates the req.body parameter with the parsed object

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      //client error code. Server can't understand because something is invalid
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate); //Whatever value is passed in to launch date, whether its a string or a number, it will now be a date object
  if (isNaN(launch.launchDate)) {
    //isNaN calls the valueOf() on the passed in parameter. A date like January 1, 2030 will be converted into its unix time stamp (e.g., 1893474000000), isNaN is False
    return res.status(400).json({
      //If oyu passed in Hello, it would do valueOf() and isNaN returns True.
      error: "Invalid launch date", //We can also use the toString function with launchdate: if (launch.launchDate.toString() === 'Invalid Date')
    });
  }

  await scheduleNewLaunch(launch);
  console.log(launch)
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); //returns a string while our flightNumber is an Integer. Therefore we have to convert it to an int

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
