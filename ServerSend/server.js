const express = require("express");
const app = express();
const dgram = require('dgram');
const ip = require("ip");
const socketio = require("socket.io");

const port = 8000;

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

var message_send = "IP?"
var data_ip_receive = 0;
var data_number_receive = 0;
var number_serial_array = [];


sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}


sendMessage()
var count = 0;

async function sendMessage() {
    for (let i = 0; i < 100; i++) {
        await sleep(100);
        // console.log("Iteration ", i);
        server.send(Buffer.from(message_send), 18181, ip_broadcast);
        count++;
    }
}

io.on("connection", function (socket) {
    // socket.on("sendIP", function (data) {
    //     if (data_ip_receive !== data) {
    //         console.log("Ip Server Receive:");
    //         console.log(data);
    //         socket.emit("test", "Đã nhận được rồi!!!");
    //         data_ip_receive = data;
    //     }
    // })
    socket.on("sendserialnumber", function (data) {

        if (number_serial_array.indexOf(data) < 0) {
            number_serial_array.push(data)
        }

    })
    if (count === 100) {
        console.log("Serial number:");
        number_serial_array.forEach(item => {
            console.log(item);
        })
    }
})



