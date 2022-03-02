const express = require('express');
const path = require('path');

const friendsRoutes = require('./routes/friends.routes')
const messageRoutes = require('./routes/messages.routes')

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 4000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method}, ${req.baseUrl}${req.url}, ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: "I´m very clever",
    caption: "Me on ski",
  })
})

app.use('/friends', friendsRoutes)
app.use('/messages', messageRoutes)

app.get('/', (req, res) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`Server is running. Listning on port: ${PORT}`)
})