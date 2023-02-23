const { getAllPlanets } = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets()) //planets is an array and we use json() to make it into a json object
}

module.exports = {
    httpGetAllPlanets,
}