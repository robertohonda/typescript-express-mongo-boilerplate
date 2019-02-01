import { RequestHandler } from "express";
import morgan from "morgan";
import IEnvConfig from "./IEnvConfig";

class ProdConfig implements IEnvConfig {

  public getMiddlewares(): RequestHandler[] {
    const middlewares = [
      morgan("combined"),
    ];

    return middlewares;
  }
}

export default ProdConfig;
