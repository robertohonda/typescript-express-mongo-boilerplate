import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { NODE_ENV, PORT } from "../../config/config";

// import UserRouter from "../../modules/user/Router";
import ErrorMiddleware from "../middlewares/error/Error";
import Mongoose from "../mongo/Mongoose";
import Router from "../router/Router";
import DevConfig from "./DevConfig";
import IEnvConfig from "./IEnvConfig";
import ProdConfig from "./ProdConfig";

class Express {
  public readonly app: express.Application;
  public readonly db: Mongoose;
  private readonly envConfig: IEnvConfig;
  private readonly error: ErrorMiddleware;
  private readonly router: Router;

  constructor() {
    this.app = express();
    this.db = new Mongoose();
    this.error = new ErrorMiddleware();
    this.router = new Router();

    switch (NODE_ENV) {
      case "development":
        this.envConfig = new DevConfig();
        break;
      case "production":
        this.envConfig = new ProdConfig();
        break;
      default:
        this.envConfig = new DevConfig();
    }
    this.useMiddlewares();
    this.useRoutes();
  }

  public start = () => {
    this.app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log(`Express server listening on port ${PORT}`);
    });
  }

  // Configure Express middleware.
  private useMiddlewares = () => {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());

    this.app.use(...this.envConfig.getMiddlewares());
  }

  private useRoutes = () => {
    // this.app.use(express.static("dist"));

    // this.app.get('/favicon.ico', (req, res) => res.status(204));

    // this.app.get("/api/getUsername", (req, res) =>
    //   res.json({ username: os.userInfo().username }),
    // );

    // this.app.use("/api/seila", new UserRouter().getRouter());

    this.app.use("/api", this.router.getRouter());

    // if error is not an instanceOf APIError, convert it.
    this.app.use("/api", this.error.handleError);

    // catch 404 and forward to error handler
    this.app.use("/api", this.error.handleNotFound);

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

export default Express;
