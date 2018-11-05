const share = require('express').Router()
const User = require('../models/user')
const Lists = require('../models/lists')
const { verify } = require('../components/jwt')

share.route('')
  .post((req, res) => {
    verify(req.headers.token)
      .then(username => {
        if (req.headers.id) {
          // Adding user to list.
          Lists.updateOne({ _id: req.headers.id },
            { $addToSet: { users: req.headers.name } })
            .then(data => res.json('Success'))
            .catch(e => { return new Error('Error') })
        } else {
          User.find({ name: req.headers.username })
            .then(data => {
              if (data.length === 0) {
                res.status(404).json('User not found')
              } else {
                if (username === req.headers.username) return new Error('Error')
                // Should add user to friend list.
                User.updateOne({ name: username },
                  { $addToSet: { friends: req.headers.username } })
                  .then(data => res.json('Success'))
                  .catch(e => { return new Error('Error') })
              }
            })
        }
      }).catch(e => res.status(401).json('Error'))
  })

  .get((req, res) => {
    verify(req.headers.token)
      .then(username => {
        User.findOne({ name: username })
          .then(data => {
            // Return array of friends.
            res.json(data.friends)
          })
      }).catch(e => res.status(401).json('Error'))
  })

module.exports = share
