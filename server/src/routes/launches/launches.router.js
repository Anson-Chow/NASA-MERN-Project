const express = require('express');

const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
} = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches) //get request
launchesRouter.post('/', httpAddNewLaunch) //matching the root of the path where launchesRouter has been mounted. (matching /launches/)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;