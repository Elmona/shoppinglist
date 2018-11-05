const changeName = require('express').Router()
const Lists = require('../models/lists')
const { verify } = require('../components/jwt')

changeName.route('')
  .post((req, res) => {
    // TODO: Error handling for not sending title and id
    console.log(req.headers.title)
    verify(req.headers.token)
      .then(username => {
        // Check if user owns the list
        Lists.findOne({_id: req.headers.id})
          .then(data => {
            if (data.owner === username) {
              Lists.updateOne({ _id: req.headers.id },
                {title: req.headers.title})
                .then(() => {
                  console.log(`${username} changed name on list to ${req.headers.title}`)
                  res.json('Success')
                })
                .catch(e => new Error('Gick inte ändra'))
            } else {
              console.log(username, ' äger inte listan och kan inte ta bort.')
              throw new Error('Jag äger den inte')
            }
          })
      }).catch(e => {
        console.log(e)
        res.status(401).json('Error')
      })
  })

module.exports = changeName
