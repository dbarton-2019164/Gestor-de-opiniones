"use strict";

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
<<<<<<< HEAD
import { dbConnection } from "./mongo.js";
=======
import cors from 'cors';
import { dbConnection } from "./mongo.js";
import adminRoutes from "../src/user/user.routes.js";
>>>>>>> ft/users

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
<<<<<<< HEAD
    this.conectarDB();
=======
    this.userPath = '/opinions/v1/users';
    

    this.middlewares();
    this.conectarDB();
    this.routes();
>>>>>>> ft/users
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

<<<<<<< HEAD
  routes() {}
=======
  routes() {
    this.app.use(this.userPath, adminRoutes);
  }
>>>>>>> ft/users

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
