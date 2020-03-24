const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const ip = require("ip");

const port = 8080;

const ip_local = ip.address();
const ip_last_index = ip_local.lastIndexOf(".");
const ip_local_convert = ip_local.substring(0,ip_last_index+1);
const ip_broadcast = ip_local_convert + "255";
const ip_receive = [];

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("listening",()=>{
  console.log(`Server đang nghe ${ip_local}:${port}`);
})

server.bind(port);


server.on('message', (msg, rinfo) => {
  console.log(`Nhận: ${msg} từ ${rinfo.address}:${rinfo.port}`);
  console.log(msg.toString('utf8'))
  var msg_convert = msg.toString("utf8");
  if(msg_convert === "IP???"){
    console.log("Đã nhận được");
    const ip_receive_convert = rinfo.address.toString("utf8")
    ip_receive.push(ip_receive_convert);
    server.send(Buffer.from(ip_local), 8000, ip_broadcast);
    console.log("IP đã nhận: ");
    console.log(ip_receive_convert);
  }
});




  
