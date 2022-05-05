const express = require('express')
const QuestionController = require('./controlles/QuestionController')
const RoomController = require('./controlles/RoomController')

const route = express.Router()

route.get('/', (req, res) => {
  res.render('index', { page: 'enter-room' })
})

route.get('/create-pass', (req, res) => {
  res.render('index', { page: 'create-pass' })
})

route.post('/create-room', RoomController.create)
route.get('/room/:roomId', RoomController.open)

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)

route.post('/enterroom', RoomController.open)

module.exports = route
