const path = require('path');
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');
const api = require('./routes/api')
const app = express();

// const planetsRouter = require('./routes/planets/planets.routes');
// const launchesRouter = require('./routes/launches/launches.routes');

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1', api);

// app.use('/planets',  planetsRouter);
// app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


module.exports = app;


