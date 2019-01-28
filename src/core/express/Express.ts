import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { NODE_ENV, PORT } from "../../config/config";


import UserRouter from "../../modules/user/route";
import DevConfig from './DevConfig'
import IEnvConfig from "./IEnvConfig";
import ProdConfig from './ProdConfig'

class Express {

  public app: express.Application;
  public EnvConfig: IEnvConfig

  constructor() {
    this.app = express();

    switch (NODE_ENV) {
      case "development":
        this.EnvConfig = new DevConfig()
        break;
      case "production":
        this.EnvConfig = new ProdConfig()
        break;
      default:
        this.EnvConfig = new DevConfig()
    }


    this.useMiddlewares();
    this.useRoutes();
  }

  public start() {
    this.app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log(`Express server listening on port ${PORT}`);
    });
    
  }

  // Configure Express middleware.
  private useMiddlewares(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());

    this.app.use(...this.EnvConfig.getMiddlewares())
  }

  private useRoutes(): void {

    // this.app.use(express.static("dist"));

    // this.app.get('/favicon.ico', (req, res) => res.status(204));

    // this.app.get("/api/getUsername", (req, res) =>
    //   res.json({ username: os.userInfo().username })
    // );

    this.app.use("/seila", new UserRouter().getRoutes());

    // this.app.use("/api", routes);

    // // if error is not an instanceOf APIError, convert it.
    // this.app.use('/api', error.converter);

    // // catch 404 and forward to error handler
    // this.app.use('/api', error.notFound);

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
