
const signup = require('express').Router()
const User = require('../models/user')

/**
 * validateName check if the username only contain numbers, lowercase and uppercase letters.
 * And no other strange characters. And is between 3 and 10 characters long.
 * @param {string} str - string to check.
 * @returns {boolean} - boolean if pass test
 */
const validateName = str => /^[a-zA-Z-0-9_åÅäÄöÖ]{3,10}$/.test(str)

signup.route('/')
  .post((req, res) => {
    return new Promise((resolve, reject) => {
      if (req.body.username === undefined ||
        req.body.password === undefined ||
        req.body.email === undefined) return reject(new Error('Invalid input'))

      const user = new User({
        name: req.body.username,
        password: req.body.password,
        email: req.body.email
      })

      if (!validateName(req.body.username)) {
        return reject(new Error('Username may only contain numbers, lowercase and uppercase letters. It must be between 3 to 10 characters long.'))
      }

      if (req.body.password.length < 6) {
        return reject(new Error('Password is to short minimum length is 6 characters long'))
      }
      user.save()
        .then(result => {
          console.log(`User added: ${result}`)
          res.json({
            success: true
          })
          resolve()
        }).catch(e => {
          if (e.code === 11000) {
            return reject(new Error('Username already taken'))
          } else {
            return reject(new Error('Something is wrong with database.'))
          }
        })
    }).catch(e => {
      console.log(`Error signup: ${e.message}`)
      res.status(401).json({
        error: e.message
      })
    })
  })

module.exports = signup
