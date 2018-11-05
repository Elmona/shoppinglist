'use strict'

const mongoose = require('mongoose')
require('dotenv').config()

// const url = 'localhost:27017'

// const username = process.env.DB_USER
// const password = process.env.DB_PWD
// const database = 'shoppinglist'

/**
 * Connection to mongoose database.
 *
 * @return {Promise<object>} - Return object
 */
module.exports.run = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
    mongoose.connection.on('error', err => console.error(`Mongoose connection error has occured: ${err}`))
    mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

    // If the Node process ends, close the Mongoose connection.
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose connection is disconnected due to application termination.')
        process.exit(0)
      })
    })
    resolve(mongoose.connect(process.env.MONGODB_URI))
  })
}
