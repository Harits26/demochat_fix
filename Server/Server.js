var moment = require('moment-timezone'),
  app = require('express')(),
  net = require('net'),
  io = require('socket.io'),
  fs = require('fs'),
  path = require('path'), 
  queryJson = require('json-query'),
  mysql = require('./Config/db');
var key = '';
var users = {};
class Main {
  constructor(site, protocol, port) {
    this.websocket(site, protocol, port);
  }

  websocket(site, protocol, port) {
    var servers = [];
    servers = require('http').Server(app);
    io = io(servers, { path: '/' + site, transports: ['websocket'] });

    servers.listen(port, function () {
      console.log(moment.tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'), 'Server [' + site + '] listening at port: ' + port + ' & protocol: ' + protocol);
    });

    io.on('connection', function (socket) {
        console.log('connected id', socket.id);

        socket.on('login', async function (data, fn) {
            console.log('>>>>', data)
            users[socket.id] = {
              "socket": socket.id,
              "id": data.id,
              "name": data.name,
              "email": data.email,
              "source": data.source
            };
            if(data.source == 'client 1'){
                mysql.db_transaction("insert into user_client_php(id, login_time, is_login, nama, email) values('"+data.id+"', now(), 'Y', '"+data.name+"', '"+data.email+"')", function(rs){
                    console.log('>>> return query >>>', rs);
                })
            }
            fn({id: data.id, name:data.name, email:data.email, message: "success"});
        });

        socket.on('users', async function (fn) {
          fn(users)
        });

        socket.on('chat', async function (data, fn) {
            console.log('>>>>', data)
            var rs = queryJson('[**][*id=' + data.destination + ']', { data: users }).value;
            rs.forEach(function (a) {
              console.log('>>> find users >>>', a); 
              io.sockets.to(a.socket).emit("receiveChat", data);
            });            
            fn(data);
        });

        socket.on('disconnect', function () {
          delete users[socket.id];
        });
    }); 
     
  }

}
new Main('bootcamp', 'http', '3000');
