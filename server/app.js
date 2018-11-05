
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socket = require('./components/socket')
const mongoose = require('./config/mongoose.js')
const bodyParser = require('body-parser')
const helmet = require('helmet')
// const path = require('path')
// const express = require('express')

const port = 3001

// dotenv for saved passwords.
require('dotenv').config()

// Connect mongoose
mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

// Use Helmet to hide i'm a express server.
app.use(helmet())

// Socket.io
socket(io)

app.use(bodyParser.json())

let path = '/'

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode.')
} else {
  console.log('Running in development mode')
  path = '/api/'
}

app.get('/test', (req, res) => {
  console.log('It works')
  res.json('It works')
});

app.use(`${path}login`, require('./routes/login'))
app.use(`${path}signup`, require('./routes/signup'))
app.use(`${path}lists`, require('./routes/lists'))
app.use(`${path}list`, require('./routes/list'))
app.use(`${path}delete`, require('./routes/delete'))
app.use(`${path}changeName`, require('./routes/changeName'))
app.use(`${path}share`, require('./routes/share'))

server.listen(port, () => console.log(`Server is running on ${port}`))
