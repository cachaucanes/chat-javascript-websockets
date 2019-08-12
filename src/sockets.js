const Chat = require('./models/chat')

module.exports = function (io) {

  const users = {}

  //aqui es donde vamos a esuchar eventos
  io.on('connection', async socket => {
    console.log('new user conected')

    let messages = await Chat.find({}).limit(10)
    socket.emit('load old msgs', messages)

    socket.on('send message', async (data, cb) => {

      let msg = data.trim() //Quita los espacios del mensaje
      //if el mesajes em sus tres primeros caracteres es igual a..
      if (msg.substr(0, 3) === '/w ') {
        msg = msg.substr(3) //mensaje es igual a mensaje despues del tercer caracter
        const index = msg.indexOf(' ')
        if (index !== -1) { //Si hay un texto
          let name = msg.substring(0, index)//guarda el usuario a enviar el mensaje
          msg = msg.substring(index + 1) //Guarda unicamente el mensaje
          if (name in users) {// si el nombre esta en la lista de users
            users[name].emit('whisper', {
              msg,
              nick: socket.nickname
            })
          }
          else {
            cb('Error! please enter a valid user')
          }
        }
        else {
          cb('Error! please your message')
        }
      }
      else {
        let newMsg = new Chat({
          msg,
          nick: socket.nickname
        })
        await newMsg.save() //guardar en la BD

        //Emite un evento a todos los sockets io.sockets
        io.sockets.emit('new message', {
          msg: data,
          nickname: socket.nickname
        }) 
      }

    })

    socket.on('new user', (data, cb) => {
      console.log(data)
      if (data in users) {
        cb(false)
      }
      else if (data) {
        cb(true)
        socket.nickname = data
        users[socket.nickname] = socket
        userConnect()//function usuario conectado para mostrar en la navbar
        updateNickNames() //actualizo lista de nicks

      } else {
        cb(false)
      }
    })

    socket.on('disconnect', data => { //cuando un socket se desconecta (evento por default)
      if (!socket.nickname) return //si socket no tiene un nickname
      delete users[socket.nickname] //desde el objeto voy a eliminar al usuario que tenga de clave el nickname que se esta desconectando
      updateNickNames() //Actualizo lista de usuarios

    })

    function userConnect(){      
      socket.emit('user-conenect', {        
        nickname: socket.nickname
      })
    }

    function updateNickNames() {
      io.sockets.emit('usernames', Object.keys(users)) //Metodo de los objetos, para obtener solo las claves de los objetos 
    }
  })
}