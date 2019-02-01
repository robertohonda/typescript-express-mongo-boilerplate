import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { NODE_ENV } from "./config";
import { PORT } from "./config";

import UserRouter from "../user/Route";

class Express {

  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.useMiddlewares();
    this.useRoutes();
  }

  public start(): void {
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

    // tslint:disable-next-line:no-console
    console.log(NODE_ENV);

    switch (NODE_ENV) {
      case "development":
        import("./express.dev").then(({ default: devMiddlewares }) => {
          this.app.use([...devMiddlewares]);
        });
        break;
      case "production":
        import("./express.prod").then(({ default: prodMiddlewares }) => {
          this.app.use([...prodMiddlewares]);
        });
        break;
      default:
        import("./express.dev").then(({ default: devMiddlewares }) => {
          this.app.use([...devMiddlewares]);
        });
    }
  }

  private useRoutes(): void {

    // this.app.use(express.static("dist"));

    // this.app.get('/favicon.ico', (req, res) => res.status(204));

    // this.app.get("/api/getUsername", (req, res) =>
    //   res.json({ username: os.userInfo().username })
    // );

    this.app.use("/seila", new UserRouter().getRouter());

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
