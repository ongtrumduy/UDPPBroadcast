const express = require("express");
const app = express();
const dgram = require('dgram');
const ip = require("ip");
const socketio = require("socket.io");

const port = 8002;

const new_server = require("http").Server(app);
const io = socketio.listen(new_server);
const server = dgram.createSocket('udp4');

new_server.listen(port);

var ip_local = ip.address();
var ip_last_index = ip_local.lastIndexOf(".");
var ip_local_convert = ip_local.substring(0, ip_last_index + 1);
var ip_broadcast = ip_local_convert + "255";


server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});

server.on("listening", () => {
    console.log(`Server đang nghe ${ip_local}:${port}`);
})

server.bind(port);

var message_send = "IP???"
var data_ip_receive = 0;
var data_number_receive = 0;


server.send(Buffer.from(message_send), 18181, ip_broadcast, (err) => {
    console.log(err);
});

io.on("connection", function (socket) {
    socket.on("sendIP", function (data) {
        if (data_ip_receive !== data) {
            console.log("Ip Server Receive:");
            console.log(data);
            socket.emit("test", "Đã nhận được rồi!!!");
            data_ip_receive = data;
        }
    })
    socket.on("sendserialnumber", function (data) {
        if (data_number_receive !== data) {
            console.log("Serial number:");
            console.log(data);
            data_number_receive = data;
        }
    })
})
