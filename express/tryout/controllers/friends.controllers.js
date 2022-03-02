const model = require('../models/friends.model')


function postFriend(req, res) {
    if (!req.body.name) {
      return res.status(400).json({
        error: 'Can not add friend without a name'
      })
    }
    const newFriend = {
      name: req.body.name,
      id: model.length
    }
    model.push(newFriend)
    res.json(newFriend)
}

// =====================================================

function getAllFriends(req, res) {
    res.send(model)
}

// =====================================================

function getSingleFriend(req, res) {
    const friendsId = req.params.friendsId;
    const friend = model[friendsId]
    if (friend) {
      res.status(200).json(friend);
    } else {
      res.status(404).json({
        "error": `Error: No friend with id "${friendsId}"`
      })
    }
}

// =====================================================


module.exports = {
  postFriend,
  getAllFriends,
  getSingleFriend
}