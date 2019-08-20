const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

const dbConfig = require('./config/db');
mongoose.connect(
  `mongodb+srv://${dbConfig.connection.user}:${dbConfig.connection.pass}@cluster0-69txq.mongodb.net/${dbConfig.connection.database}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
