//var http=require("http");
var express =  require("express");
var app = express();
var fs=require("fs");
var socket = require("socket.io");

var port = 9911;

var bufferMsg = new Array;

/*var httpServer = http.createServer (function(req,res){   
       
    console.log('solicitud: ' + req.url);
    fs.readFile('.'+req.url,function(err,html){
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
    */
   
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

app.use(express.static(__dirname));

app.get('/', function(req,res){
    res.send('Server is working hard! :P');
    res.end();    
});

var server = app.listen(port);

console.log('Servidor web en marcha en ' + port);

//var io = socket.listen(httpServer);
var io = socket.listen(server);
io.sockets.on('connection', function(socket){
    console.log('Cliente conectado: ' + socket.id);

    socket.send('Conexión aceptada');
    
    socket.on('getMsgs', function(){      
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


