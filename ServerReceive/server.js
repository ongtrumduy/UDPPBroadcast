const express = require("express");
const app = express();
const dgram = require('dgram');
const socketio = require("socket.io");
const ip = require("ip");

const new_server = require("http").Server(app);
const io = socketio.listen(new_server);
const server = dgram.createSocket('udp4');

const port = 18181;
new_server.listen(port);

var ip_local = ip.address();
var ip_last_index = ip_local.lastIndexOf(".");
var ip_local_convert = ip_local.substring(0, ip_last_index + 1);
var ip_broadcast = ip_local_convert + "255";
var ip_receive = [];


server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("listening", () => {
  console.log(`Server đang nghe ${ip_local}:${port}`);
})

server.bind(port);

var serial_number = "124584";

server.on('message', (msg, rinfo) => {
  console.log(`Nhận: ${msg} từ ${rinfo.address}:${rinfo.port}`);
  console.log(msg.toString('utf8'))
  var msg_convert = msg.toString("utf8");
  if (msg_convert === "IP???") {
    console.log("Đã nhận được");
    const ip_receive_convert = rinfo.address.toString("utf8")
    ip_receive.push(ip_receive_convert);
    server.send(Buffer.from(ip_local), rinfo.port, ip_broadcast);

    console.log("=============================================");
    console.log("Các IP đã nhận: ");
    ip_receive.forEach(item => {
      console.log(item);
    })
    console.log("=============================================");
  }
  io.on("connection", function (socket) {
    io.emit("sendserialnumber", serial_number);
    socket.on("test", function (data) {
      console.log("Gửi trả:");
      console.log(data); 
    })
  });
 
});




