const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const mongoose = require('mongoose')

const app = express() //una vez utilizamos la funcion, devuelve un objeto de javascript con opciones y metodos
const server = http.createServer(app)
const io = socketio.listen(server)//Devuleve una connection de websockets

//DB connection
mongoose.connect('mongodb://localhost/chat-database')
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err))

//Settings
app.set('port', process.env.PORT || 3000)

//Requiero el archivo, ejecuto la funcion y paso la connecion de websockets
require('./sockets')(io)

//static files
app.use(express.static(path.join(__dirname, 'public')))


//start server
server.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})