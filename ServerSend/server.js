const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const ip = require("ip");

const port = 8000;

const ip_local = ip.address();
const ip_last_index = ip_local.lastIndexOf(".");
const ip_local_convert = ip_local.substring(0, ip_last_index + 1);
const ip_broadcast = ip_local_convert + "255";
const ip_receive = [];

server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
});

server.on("listening", () => {
    console.log(`Server đang nghe ${ip_local}:${port}`);
})

server.bind(port);


const message_send = "IP???"

server.send(Buffer.from(message_send), 8080, ip_broadcast);

server.on("message", (msg, rinfo) => {
    console.log("Gửi yêu cầu: IP???");
    console.log(`Nhận: ${msg} từ ${rinfo.address}:${rinfo.port}`);
    const ip_receive_convert = rinfo.address.toString("utf8");
    ip_receive.push(ip_receive_convert);


    // console.log("=============================================");
    // console.log("Các IP đã nhận: ");
    // ip_receive.forEach(item => {
    //     console.log(item);
    // })
    // console.log("=============================================");

}
)


