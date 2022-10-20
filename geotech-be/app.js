const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
};
const app = express();
app.use(index);

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server, { cors: corsOptions });

let interval;
let actionFromUser;

io.on("connect", (socket) => {
  console.log("New client connected", socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 4000);
  socket.on("FromClient", (data) => {
    actionFromUser = data;
    socket.emit("getUserMove", actionFromUser);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", { response });
};

server.listen(port, function () {
  console.log("Server Started. Listening on *:" + port);
});
