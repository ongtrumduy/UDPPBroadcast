const dgram = require('dgram');
const ip = require("ip");
const io_client = require("socket.io-client");

const port = 8001;


const server = dgram.createSocket('udp4');

var ip_local = ip.address();
var ip_last_index = ip_local.lastIndexOf(".");
var ip_local_convert = ip_local.substring(0, ip_last_index + 1);
var ip_broadcast = ip_local_convert + "255";
var ip_receive_convert = 0;

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});



server.on("listening", () => {
    console.log(`Server đang nghe ${ip_local}:${port}`);
})

server.bind(port);


var message_send = "IP???"
var data_receive = 0;

server.send(Buffer.from(message_send), 18181, ip_broadcast, (err) => {
    console.log(err);
});


server.on("message", (msg, rinfo) => {
    console.log("Gửi yêu cầu: IP???");
    console.log(`Nhận: ${msg} từ ${rinfo.address}:${rinfo.port}`);
    ip_receive_convert = rinfo.address.toString("utf8");
    console.log("IP đã nhận: ");
    console.log(ip_receive_convert);

    var server_receive_address = "http://" + ip_receive_convert + ":18181";

    const socket = io_client.connect(server_receive_address);

    console.log(server_receive_address);

    socket.on("sendserialnumber", function (data) {
        if (data_receive !== data) {
            console.log("Serial number:");
            console.log(data);
            socket.emit("test", "Đã nhận được rồi!!!");
            data_receive = data;
        }
    })
}
)