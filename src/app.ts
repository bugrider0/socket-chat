import path from "path";

import "dotenv/config";
import express, { Application } from "express";

// App
const app: Application = express();

// Set '/public' For Static Files
app.use(express.static(path.join(__dirname, "public")));

const { PORT, HOST, NODE_ENV } = process.env;
app.listen(PORT, () =>
  console.log(
    `Server is Running on -> http://${HOST}:${PORT} and ${NODE_ENV} Mode`
  )
);
