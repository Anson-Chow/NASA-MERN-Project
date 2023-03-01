const launches = new Map() //Map, key value pair

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'Anson'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch); //key value pair, can be any value (including functions)

function existsLaunchWithId(launchId) { //check if our launch has that ID
    return launches.has(launchId)
}
function getAllLaunches() { // The array from method changes the iterables of launches.values into an array that contains those values. json() can only take js object or an array (which is also valid json)
    return Array.from(launches.values()); // Our launches is a map (key:value pair). We want the values.
} //for (const value of launches.values()){ ... }

function addNewLaunch(launch) { 
    latestFlightNumber += 1; //setting the flight number on the server side, this makes it so that launch won't contain a flight number
    launches.set( //Therefore we need to set the flight number on the launch object
        latestFlightNumber, //key for our launch
        Object.assign(launch, { //We still want to keep track of the flight number in our launch data so that it's returned from our api from getAllLaunches
            success: true, //We need to add it to our launch object 
            upcoming: true, //The Object.assign takes the launch object and assigns some additional properties to it. If it already exists, it will overwrite it
            customers: ['Anson, NASA'], 
            flightNumber: latestFlightNumber, //NOTE ** there are 8 values in the launch map, but we set 4 here to default values. This means the client needs to send us the other 4
    })) //data that is determined on the server side
}

function abortLaunchById(launchId) { //abort launch
    const aborted = launches.get(launchId); 
    aborted.upcoming = false;
    aborted.success = false;
    return aborted
}


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}
