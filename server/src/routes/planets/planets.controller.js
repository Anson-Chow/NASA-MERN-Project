const { getAllPlanets } = require('../../models/planets.model')

async function httpGetAllPlanets(req, res) {
    return res.status(200).json(await getAllPlanets()) //planets is an array and we use json() to make it into a json object
}

module.exports = {
    httpGetAllPlanets,
}