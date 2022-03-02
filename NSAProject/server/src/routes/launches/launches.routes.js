const express = require('express');
const launchesRouter = express.Router();

const {
  httpGetAlleLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
} = require('./launches.controller')

// planetsRouter.get('/', getAllePlanets);
launchesRouter.get('/', httpGetAlleLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter;