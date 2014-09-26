var port = 8080;
var serverUrl = "127.0.0.1";
 
var http = require("http");
var path = require("path");
var express = require("express");
var fs = require("fs");

var page = "test.html";
 
console.log("[Server] Starting web server at " + serverUrl + ":" + port);


var mysql      = require('mysql');
var connectionDB = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "root",
  database : "test1"
});
connectionDB.connect();

server = http.createServer( function(req, res) {
	var now = new Date();
	var filename = req.url || page;
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",	
		".js": "application/javascript",
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png",
		".ico": "image/ico"
	};
	var isValidExt = validExtensions[ext];
	if (isValidExt) {
		localPath += filename;
		path.exists(localPath, function(exists) {
			if(exists) {
				//console.log("Serving file: " + localPath);
				getFile(localPath, res, ext);
			} else {
				console.log("[Server] File not found: " + localPath);
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end("[Server] "+filename+' not found\n');
			}
		});
	} else {
		console.log("[Server] Invalid file extension detected: " + ext)
	}
});
 
function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
	if(!err) {
		res.setHeader("Content-Length", contents.length);
		res.setHeader("Content-Type", mimeType);
		res.statusCode = 200;
		res.end(contents);
	} else {
			res.writeHead(500);
			res.end();
		}
	});
}

var io = require('socket.io').listen(server);
console.log('[Server] Created socket.io socket.');
io.sockets.on('connection', function (socket) {
	console.log('[Client] A client has connected.');
	connectionDB.query(
		'SELECT * FROM messages', 
		function(err, rows, fields){
			if (err) throw err;
			else{
				console.log('[Client] Sent all current messages to client.');
				//console.log(rows);
				//console.log('[request] line#1: ' + rows[0]['action']);
				socket.emit('connectionReply', rows);
			}
			//connectionDB.end();
			
		}
	);
	//
	
	//
});

server.listen(port, serverUrl);