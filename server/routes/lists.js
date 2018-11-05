const lists = require('express').Router()
const Lists = require('../models/lists')
const { verify } = require('../components/jwt')

lists.route('')
  .get((req, res) => {
    verify(req.headers.token)
      .then(username => {
        Lists.find({users: username})
          .then(data => {
            // Return all the lists the user is added on
            res.json(data)
          })
      }).catch(e => {
        res.status(401).json('Error')
      })
  })

  .post((req, res) => {
    verify(req.headers.token)
      .then(username => {
        const lists = new Lists({
          owner: username,
          title: req.headers.name,
          users: [username],
          list: []
        })
        lists.save()
          .then(x => {
            console.log(`${username} created new list.`)
            // New list added to user
            res.json('Success')
          })
      }).catch(e => {
        console.log(e)
        res.status(401).json('Error')
      })
  })

module.exports = lists
