const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//socket服务器监听连接 表示已建立连接
io.on('connection', socket => {
  //向客户端发送一个事件消息
  socket.emit('request', /* … */); // emit an event to the socket

socket.on('login',(data)=>{
  socket.username = data
  console.log(data+'登录了');
})
  //监听客户端发来的消息
  socket.on('send', (data) => { 
    console.log('客户端发来'+data);
      io.emit('msg', {user:socket.username ,msg:data});
   });
});
//添加中间件
app.use(express.static(__dirname+'/static'));
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.get('*', function (req, res) {
    res.sendfile(__dirname+'/view/ChatRoom.html')
  })

server.listen(3000);