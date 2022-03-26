const socket = io()
// let name_p;
let messageArea = document.querySelector('.message__area')
let textarea = document.querySelector('#textarea')
do{
    name_p = prompt('Please Enter your name: ')
}while(!name_p)

textarea.addEventListener('keyup',(e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name_p,
        message:message.trim()
    }

    //append
    appendMessage(msg,'outgoing')
    socket.emit('message',msg)
}

function appendMessage(mssg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = 
        `
        <h4>${mssg.user}</h4>
        <p>${mssg.message}</p>
        `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    scrolll()
    textarea.value = ""
}

// recieve message

socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    
})

function scrolll(){
    messageArea.scrollTop = messageArea.scrollHeight 
}