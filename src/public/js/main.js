$(function () { //funcion de jquery

  const socket = io()//en local

  //Obteniendo elements DOM from the interface
  const $messageForm = $('#message-form')
  const $messageBox = $('#message')
  const $chat = $('#chat')

  //Obtaining DOM elements fron the nickname
  const $nickForm = $('#nickForm')
  const $nickError = $('#nickError')
  const $nickname = $('#nickname')
  const $UserConnect = $('#UserConnect')

  const $users = $('#usernames')

  //Msg private
  const $privateMsg = $('#privateMsg')

  $nickForm.submit(e => {
    e.preventDefault()

    //Primero enbio el valor del nick
    socket.emit('new user', $nickname.val(), data => {
      if (data) { //si el nick no existe
        $('#nickWrap').hide()
        $('#contentWrap').show()
      }
      else {
        $nickError.html(`
          <div class="alert alert-danger">
            That username already exists
          </div>
        `)
        setTimeout(function (e) {
          $nickError.html('')
        }, 3000)
      }
      $nickname.val('')//pongo en blanco el campo del nick

    })

  })

  //Events capture
  $messageForm.submit(e => {
    socket.emit('send message', $messageBox.val(), data => { //data recibe posibles errores
      $chat.append(`<p class="error">${data}</p>`)
    })
    $messageBox.val('')
    e.preventDefault() //no recargue el navegador

  })

  socket.on('new message', function (data) {
    $chat.append(`<b>${data.nickname}:</b> ${data.msg} </br>`)
  })

  //Escuchar el evento usernames 
  socket.on('usernames', data => {
    let html = ''
    for (let i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i> ${data[i]}
      <span id="privateMsg" class="privateClick badge badge-warning"><i class="fas fa-location-arrow"></i> Send private</span>          
    </p>
      `
    }
    $users.html(html)
  })

  //Escucha el evento privado
  socket.on('whisper', data => {
    $chat.append(`<p class="whisper"><b>${data.nick}</b> ${data.msg}</p>`)
  })

//Carga rl nick de userConnect
socket.on('user-conenect', data => {
  $UserConnect.append(`<i class="fas fa-user"></i> ${data.nickname}`)
})

  //cargar mensages ultimos mensages
  socket.on('load old msgs', data => {
    for (let i = 0; i < data.length; i++) {
      displayMsg(data[i])
    }
  })

  function displayMsg(data) {
    $chat.append(`<p class="whisper"><b>${data.nick}</b> ${data.msg}</p>`)
  }

  /* $privateMsg.click(function() {
    console.log('hola')
  }) */

})
/* const socket = io()//en local */

