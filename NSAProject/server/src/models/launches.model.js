const axios = require('axios');

const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;
const SPX_API_URL = process.env.SPACEX_API_URL;
 
async function populateLaunches() {

  const response = await axios.post(SPX_API_URL, {
    query: {},
    options: {
      // page: 1,
      // limit: 20, 
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data...');
    throw new Error('Launch data download faild!');
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    })

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchData: launchDoc['date_local'],
      customers: customers,
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success']
    }
    console.log(launch);

    // Populate data to database!
    await saveLaunch(launch);
  }

}

async function loadLaunchesData() {
  console.log(`Downloading spaceX data FROM ${SPX_API_URL}`);

  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat'
  });

  if (firstLaunch) {
    console.log('Launch data already loaded');
  } else {
    populateLaunches();
  }

}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}
async function existsLaunchWitId(launchId) {
  return await findLaunch({
    flightNumber: launchId
  });
}
async function saveLaunch(launch) {
  await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}

async function getAlleLaunches(skip, limit) {
  return await launches.find({}, { '_id': 0, '__v': 0 })
  .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit);
}

async function scheduleNewLaunch(launch) {


  const planet = await planets.findOne({ kepler_name: launch.target });
  if (!planet) {
    throw new Error("No matching planet found!");
  }


  const newFlightNumber = await getLatestFlightNumber() + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['NASA', 'ME'],
    flightNumber: newFlightNumber
  });

  await saveLaunch(newLaunch);
}



async function getLatestFlightNumber() {
  const latestLaunch = await launches
    .findOne()
    .sort('-flightNumber');
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false
  });
  return aborted.modifiedCount === 1;
}


module.exports = {
  getAlleLaunches,
  scheduleNewLaunch,
  existsLaunchWitId,
  abortLaunchById,
  loadLaunchesData
}