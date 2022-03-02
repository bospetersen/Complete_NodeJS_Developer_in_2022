const path = require('path');

function getMessages(req, res) {

  const path_to_file = path.join(__dirname, '..',  'public','images', 'skimountain.jpg')
  res.sendFile(path_to_file)
  // const message = {
  //     title: 'Messages to my Friends!',
  //     friend: 'Elon Musk',
  //   }
  // res.json(message)
  // res.render('messages', {
  //   title: 'Messages to my Friends!',
  //   friend: 'Elon Musk',
  // });
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'));
}

function postMessage(req, res) {
  console.log('Updating messages...');
  res.json(res.message)
}

module.exports = {
  getMessages,
  postMessage,
};