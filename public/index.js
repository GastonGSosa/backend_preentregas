const socket = io();

const chatBox = document.getElementById('chatBox');

chatBox.addEventListener('keyup', evt => {

    if (evt.key === 'Enter') {
        socket.emit('message', chatBox.value)
    }

})

socket.on('history', data =>{
    const {id, message} = data
    let history = document.getElementById('history')
    let messages= '';
    data.forEach( message => {
        messages += `id[${id}] said: ${message} <br/>`
    })
    history.innerHTML = messages;
    chatBox.value = ''
})
