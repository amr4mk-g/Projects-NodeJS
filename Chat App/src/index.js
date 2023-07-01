const socketIo = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')

const dir = path.join(__dirname,'../public')
const port = 3000
const app = express()
const server = http.createServer(app)
const io = socketIo(server)
app.use(express.static(dir))

io.on('connection', (socket)=>{
    console.log('Web socket connection')

    socket.broadcast.emit('message', create('New User Joined'))
    socket.join('room-name')

    socket.on('sendMessage', (data, callback)=>{ 
        io.emit('message', create(data))
        callback('done')
    })
    socket.on('disconnect', ()=>{ 
        io.emit('message', create('User Left'))
    })
})

server.listen(port, ()=>{
    console.log('Server on http://localhost:'+port)
})

function create(mess) {
    return {message: mess, createdAt: new Date().getTime()}
}
