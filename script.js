const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const selectedFile = document.getElementById('send-button')

const name = prompt('what is your name?')
appendMessage(`you joined`)
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('file-message', data => {
    console.log(data.file)
    appendMessage('file recieved')
    // readURL(data.file)
    appendFile(data)
    
})
socket.on('user-connection', name => {
    appendMessage(`${name} connected`)
})
socket.on('user-disconnection', name => {
    appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            msg = {}
            msg.src = e.target.result
            img = document.createElement('img')
            img.src = e.target.result
            img.style.width="50%";
            messageContainer.append(img)

            socket.emit('send-file-message', msg);
        };
        

        reader.readAsDataURL(input.files[0]);
        
    }
}
function appendMessage(message) {
    messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
function appendFile(message) {
    img = document.createElement('img')
    img.src = message.file
    messageContainer.append(img)

}