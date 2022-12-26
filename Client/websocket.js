"use strict"
import io from 'socket.io-client'
import { appendMessage } from './event';
export default class WebSocket {
    constructor(id) {
        this._ws;
        this.websocket;
        this.connect()
    }


    setWSocket(id) {
        this._ws = id;
    }

    getWSocket() {
        return this._ws;
    }

    connect() {
        // this.websocket = io("ws://10.18.1.114:3000", { path: '/bootcamp', secure: true, transports: ['websocket'] });
        this.websocket = io("ws://127.0.0.1:3000", { path: '/bootcamp', secure: true, transports: ['websocket'] });
        this.setWSocket(this.websocket)
        // this.websocket.emit('login', {id: username, email: email, source: "client 2"}, function(rs){
        //     console.log('>>> login return ', rs)
        // })
        this.websocket.on('connect', function () {
            console.log('>>>> connect >>>');
            $('#test').html('connected to server')
        });
        this.websocket.on('reconnecting', function (event) {
            console.log('>>>> reconnecting >>>');
            $('#test').html('reconnecting to server')
        });
        this.websocket.on('reconnect_error', function (event) {
            console.log('>>>> reconnect_error >>>');
        });
        this.websocket.on('receiveChat', function (event) {
            console.log('>>>> receiveChat >>>', event);
        });
        this.websocket.on('clientLogin', function (event) {
            alert('1 user logged in' + event.name)
        });
        this.websocket.on('ping', function () { });
        this.websocket.on('pong', function () { });
        this.websocket.on('disconnect', function (event) {
            $('#test').html('disconnect to server')
            console.log('websocket disconnected', event);
        });
        this.websocket.on('Client1Chat', function (rs) {
            console.log(rs);

            appendMessage(rs.name, "../Client/img/hetset.png", "left", rs.message);
        });
    }

    listUser(fn) {
        this.websocket.emit('users', function (rs) {
            fn(rs)
        })
    }

    getName(id, fn) {
        this.websocket.emit('getName', { id: id }, function (rs) {
            fn(rs);
        })
    }

    sentChat(sender, destination, message, fn) {
        this.websocket.emit('chat', { sender: sender, destination: destination, message: message, source: 'client 2' }, function (rs) {
            fn(rs);
        })
    }

    login(name, email, source, id, fn) {
        this.websocket.emit('login', { name: name, email: email, source: source, id: id }, function (rs) {
            // console.log('>>> login return ', rs)
            fn(rs);
        })
    }
}

// let wss = new WebSocket();