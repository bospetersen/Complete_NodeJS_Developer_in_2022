const app = require('./app');
const http = require('http');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model')

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`Server is running and listning on port ${PORT}\n`);
  });
}

startServer()






