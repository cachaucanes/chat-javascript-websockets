const mongoose = require('mongoose')

const { Schema } = mongoose

const ChatShema = new Schema ({
  nick: String,
  msg: String,
  created_at: {
    type: Date,
    default: Date.now
  }
})

//Exporta un modelo de mongoose
module.exports = mongoose.model('Chat', ChatShema) //Se va guardar dentro de la DB como Chat