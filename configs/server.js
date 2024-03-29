"use strict";

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import { dbConnection } from "./mongo.js";
import userRoutes from "../src/user/user.routes.js";
import publicationsRoutes from "../src/publications/publications.routes.js";
import commentsRoutes from "../src/comments/comments.routes.js";
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/opinions/v1/users';
    this.publicationPath = '/opinions/v1/publications';
    this.commentPath = '/opinions/v1/comments';


    this.middlewares();
    this.conectarDB();
    this.routes();
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

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.publicationPath, publicationsRoutes);
    this.app.use(this.commentPath, commentsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}

export default Server;
