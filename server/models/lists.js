'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lists = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  users: [{
    type: String,
    required: true
  }],
  list: [{
    item: { type: String, required: true },
    marked: {type: Boolean, required: true}
  }]
})

const Lists = mongoose.model('list', lists)

module.exports = Lists
