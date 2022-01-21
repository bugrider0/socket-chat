import path from "path";
import http from "http";

import "dotenv/config";
import express, { Application } from "express";
import { Server } from "socket.io";

// App
const app: Application = express();

// Main Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server);

// Set '/public' For Static Files
app.use(express.static(path.join(__dirname, "public")));

const { PORT, HOST, NODE_ENV } = process.env;
server.listen(PORT, () =>
  console.log(
    `Server is Running on -> http://${HOST}:${PORT} and ${NODE_ENV} Mode`
  )
);
