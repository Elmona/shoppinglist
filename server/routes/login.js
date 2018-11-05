
const login = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { sign } = require('../components/jwt')

login.route('/')
  .post((req, res) => {
    return new Promise((resolve, reject) => {
      if (req.body.username === undefined || req.body.password === undefined) return reject(new Error('Invalid input'))
      User.findOne({ name: req.body.username })
        .exec()
        .then(x => {
          if (!x) return reject(new Error('User not found'))
          return bcrypt.compare(req.body.password, x.password)
        })
        .then(login => {
          if (!login) return reject(new Error('Wrong password'))
          console.log('User successfully logged in')
          sign(req.body.username)
            .then(token => {
              res.json({
                token: token
              })
              resolve()
            })
        }).catch(e => reject(new Error(e)))
    }).catch(e => {
      console.log(`Error login: ${e.message}`)
      res.status(401).json({
        error: 'Error'
      })
    })
  })

module.exports = login
