import { Server } from "./server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "./config/config";
import logging from "./config/logging";
import cors = require("cors");

const NAMESPACE = "Server";

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, "connected to MongoDB!");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });
/**
 * Application class.
 * @description Handle init config and components.
 */
dotenv.config({
  path: ".env",
});

export class Application {
  server: Server;

  init() {
    this.initServer();
  }

  private initServer() {
    this.server = new Server();
  }

  start() {
    ((port = process.env.APP_PORT || 5000) => {
      this.server.app.use(cors())
      this.server.app.listen(port, () =>
        console.log(`> Listening on port ${port}`)
      );
      this.server.app.use("/api", this.server.router);
    })();
  }
}
