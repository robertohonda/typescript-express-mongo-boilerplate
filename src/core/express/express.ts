// Express and mongoose must be load first
import express from "express";
import Mongoose from "../mongo/mongoose";

import { NODE_ENV, PORT } from "../../config/config";
import IEnvConfig from "./IEnvConfig";
import IExpress from "./IExpress";

import bodyParser from "body-parser";
import cors from "cors";
import ErrorMiddleware from "../middlewares/error";
import passport from "../passport";
import mainRouter from "../router";
import devConfig from "./devConfig";
import prodConfig from "./prodConfig";

class Express implements IExpress {
  public readonly app: express.Application;
  private readonly envConfig: IEnvConfig;

  constructor() {
    this.app = express();

    switch (NODE_ENV) {
      case "development":
        this.envConfig = devConfig;
        break;
      case "production":
        this.envConfig = prodConfig;
        break;
      default:
        this.envConfig = devConfig;
    }
    this.config();
    this.useMiddlewares();
    this.useRoutes();
  }

  public start = (): void => {
    this.app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log(`Express server listening on port ${PORT}`);
    });
  }

  private config = (): void => {
    Mongoose.connect();
  }

  // Configure Express middleware.
  private useMiddlewares = (): void => {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());

    this.app.use(passport.initialize());

    this.app.use(...this.envConfig.getMiddlewares());
  }

  private useRoutes = (): void => {
    // this.app.use(express.static("dist"));

    // this.app.get('/favicon.ico', (req, res) => res.status(204));

    // this.app.get("/api/getUsername", (req, res) =>
    //   res.json({ username: os.userInfo().username }),
    // );

    // this.app.use("/api/seila", new UserRouter().getRouter());

    this.app.use("/api", mainRouter);

    // if error is not an instanceOf APIError, convert it.
    this.app.use("/api", ErrorMiddleware.handleError);

    // catch 404 and forward to error handler
    this.app.use("/api", ErrorMiddleware.handleNotFound);

    // // handle every other route with index.html, which will contain
    // // a script tag to your application's JavaScript file(s).
    // this.app.get("/*", function (req, res) {
    //   res.sendFile(path.join(__dirname, "../../dist/index.html"), function (err) {
    //     if (err) {
    //       res.status(500).send(err)
    //     }
    //   });
    // });
  }
}

export default new Express();
