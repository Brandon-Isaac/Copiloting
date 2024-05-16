//Create web server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Load the MySQL pool connection
var pool = require('./db');

//Create a web server
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//Create a GET route that returns all comments
app.get('/comments', function(req, res){
    //Select all data from MySQL
    pool.query('SELECT * FROM comments', function (error, result, fields) {
        if (error) throw error;

        //Return all comments in JSON format
        res.send(result);
    });
});

//Listen on port 3000
http.listen(3000, function(){
    console.log('Listening on *:3000');
});

//Create a WebSocket connection
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('User disconnected');
    });
});

//When a new comment is inserted
pool.on('enqueue', function () {
    io.emit('new_comment', 'A new comment has been added');
});