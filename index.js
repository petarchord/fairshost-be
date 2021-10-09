// const fs = require("fs");
const http = require("http");
// const https = require("https");
require("https").globalAgent.options.rejectUnauthorized = false;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
// const options = {
//   key: fs.readFileSync("keys/privatekey.pem"),
//   cert: fs.readFileSync("keys/certificate.pem"),
// };

var server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const config = require("./config.json");

const RTCMultiConnectionServer = require("rtcmulticonnection-server");

io.on("connection", (socket) => {
  RTCMultiConnectionServer.addSocket(socket, {
    config: config,
  });
});

server.listen(process.env.PORT || 9001, function () {
  console.log("server is up and running at %s port", process.env.PORT || 9001);
});
