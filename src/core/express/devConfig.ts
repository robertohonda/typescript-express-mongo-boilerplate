import { RequestHandler } from "express";
import morgan from "morgan";
import IEnvConfig from "./IEnvConfig";

class DevConfig implements IEnvConfig {
  public getMiddlewares = (): RequestHandler[] => {
    const middlewares = [morgan("dev")];

    return middlewares;
  }
}

export default new DevConfig();
