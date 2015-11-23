var http = require('http'),
    io = require('socket.io');

var conns = [];


var server = http.createServer().listen(8888,'0.0.0.0',function(){
    console.log('server starting... the port is 8888');
});

io = io.listen(server);

io.sockets.on('connection',function(socket){
    conns.push(socket);
    console.log('conned');
    socket.emit('news', { hello: '欢迎加入聊天室' });


    //收到消息
    socket.on('message',function(data){
       for(var i=0;i<conns.length;i++){
         conns[i].emit("message",data);
       } 
    });

    socket.on('disconnect',function(){
        var index; //socket在列表索引
        for(var i=0;i<conns.length;i++) {
            if (conns[i] !== socket) {
                var info;
                conns[i].emit('news',{hello:socket + "离开聊天室"});
            }else{
                index = i;
                console.log(socket + "离开聊天室");
            };
        }

        //去除该socket
        conns.splice(index,1);
    });
});

