const socket = io()

let input = document.querySelector('input')
let btn = document.querySelector('#send')

socket.on('message', (data)=>{
    console.log(data)
})

btn.addEventListener('submit', (e)=>{
    e.preventDefault()
    socket.emit('sendMessage', input.value, (data)=>{ 
        input.value = ''
        input.focus()
    })
})