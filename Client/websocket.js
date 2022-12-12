"use strict"
import io from 'socket.io-client'
export default class WebSocket{
    constructor(){
        this._ws;
        this.websocket;
        this.connect();
    }

    setWSocket(id) {
        this._ws = id;
    }

    getWSocket() {
        return this._ws;
    }    

    connect() {
        this.websocket = io("ws://127.0.0.1:3000", { path:'/bootcamp',secure: true, transports: ['websocket'] });
        this.setWSocket(this.websocket)
        
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
        this.websocket.on('ping', function () {});    
        this.websocket.on('pong', function () {}); 
        this.websocket.on('disconnect', function (event) {
            $('#test').html('disconnect to server')
            console.log('websocket disconnected', event);
        });            
    }

    login(id, name, email, source, fn){
        this.websocket.emit('login', {id:id, name:name, email:email, source:source}, function(rs){
            // console.log('>>> login return ', rs)
            fn(rs);
        })
    }

    listUser(fn){
        this.websocket.emit('users', function(rs){
            fn(rs)
        })
    }

    sentChat(source, destination, message, fn){
        this.websocket.emit('chat', {source:source, destination:destination, message:message}, function(rs){
            fn(rs)
        })
    }
}