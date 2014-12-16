var http=require("http");
var fs=require("fs");
var socket = require("socket.io");

var port = 8374;

var bufferMsg = new Array;

var httpServer = http.createServer (function(req,res){
    fs.readFile('test1.html',function(err,html){
        if(err){
           res.writeHead(200,{'Content-type':'text/html'});
           res.end();
        }
        else{            
            res.writeHead(200,{'Content-type':'text/html'});
            res.end(html);                
        }     
    }); 
       
    }).listen(port);

console.log('Servidor web en marcha en ' + port);

var io = socket.listen(httpServer);

io.sockets.on('connection', function(socket){
    console.log('Cliente conectado: ' + socket.id);

    socket.send('Conexión aceptada');
    
    socket.on('getMsgs', function(){
       /* var htmlList = '<ul>';
        for(var i=0;i<bufferMsg.length;i++){
            htmlList += '<li>'+bufferMsg[i]+'</li>';
        }
        htmlList += '</ul>';
        */
        socket.send(bufferMsg);
    });
    
    socket.on('clearMsgs',function(){
        bufferMsg=new Array;
    });
    socket.on('message',function(data){
        bufferMsg[bufferMsg.length] = data;
        console.log(JSON.stringify(data));
    });
});


