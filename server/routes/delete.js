const deleteList = require('express').Router()
const Lists = require('../models/lists')
const { verify } = require('../components/jwt')

deleteList.route('')
  .post((req, res) => {
    // console.log(req.headers.id)
    verify(req.headers.token)
      .then(username => {
        // Check if user owns the list
        Lists.findOne({_id: req.headers.id})
          .then(data => {
            if (data.owner === username) {
              Lists.remove({ _id: req.headers.id }).exec()
                .then(() => {
                  console.log(`${username} deleted list.`)
                  res.json('Success')
                })
                .catch(e => new Error('Gick inte ta bort'))
            } else {
              console.log(username, ' this function is not completed yet')
              // TODO: Should remove user from list.
              throw new Error('Jag äger den inte')
            }
          })
      }).catch(e => {
        console.log(e)
        res.status(401).json('Error')
      })
  })

module.exports = deleteList
