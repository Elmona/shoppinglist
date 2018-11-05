const list = require('express').Router()
const Lists = require('../models/lists')
const { verify } = require('../components/jwt')

list.route('')
  .get((req, res) => {
    verify(req.headers.token)
      .then(username => {
        // Add the user to the list if not already added
        Lists.findOneAndUpdate(
          {_id: req.headers.id},
          { $addToSet: { users: username } },
          { upsert: true }).exec()

        // Find the selected list and send it back.
        Lists.findOne({_id: req.headers.id})
          .then(data => {
            res.json(data)
          })
      }).catch(e => {
        res.status(401).json('Error')
      })
  })

module.exports = list
