const dgram = require('dgram');
const ip = require("ip");
const io_client = require("socket.io-client");


const server = dgram.createSocket('udp4');

const port = 18181;

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
  // console.log(`Nhận: ${msg} từ ${rinfo.address}:${rinfo.port}`);
  var msg_convert = msg.toString("utf8");
  // console.log(msg_convert);
  if (msg_convert === "IP?") {
    // console.log("Đã nhận được");
    const ip_receive_convert = rinfo.address.toString("utf8")
    if (ip_receive.indexOf(ip_receive_convert) < 0) {
      ip_receive.push(ip_receive_convert);
      console.log("=============================================");
      console.log("Các IP đã nhận: ");
      ip_receive.forEach(item => {
        console.log(item);
      })
      console.log("=============================================");
    }
    var server_receive_address = "http://" + ip_receive_convert + ":" + rinfo.port;
    // console.log(server_receive_address);
    const socket = io_client.connect(server_receive_address);
    // socket.emit("sendIP", ip_local);
    socket.emit("sendserialnumber", serial_number);
  }
});





