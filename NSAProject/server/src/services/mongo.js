const mongoose = require('mongoose');

const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const DB_URL = `mongodb+srv://bsp-kbh:${DB_PASSWORD}@cluster0.2f2hn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connection.on('open', () => {
  console.log('\nMongoDB connection ready to receive data')
});
mongoose.connection.on('error', (err) => {
  console.error(err)
})

async function mongoConnect() {
  await mongoose.connect(DB_URL)
}


async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}
