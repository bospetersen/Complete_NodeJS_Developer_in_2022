const express = require('express');
const planetsRouter = express.Router();

const { httpGetAllPlanets } = require('./planets.controller')

// planetsRouter.get('/', getAllePlanets);
planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;