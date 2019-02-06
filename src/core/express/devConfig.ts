import morgan from "morgan";
import IEnvConfig from "./IEnvConfig";

class DevConfig implements IEnvConfig {
  public getMiddlewares = () => {
    const middlewares = [morgan("dev")];

    return middlewares;
  }
}

export default new DevConfig();
