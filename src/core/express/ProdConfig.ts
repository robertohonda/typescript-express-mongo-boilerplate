import morgan from "morgan";
import IEnvConfig from "./IEnvConfig";

class ProdConfig implements IEnvConfig {
  public getMiddlewares = () => {
    const middlewares = [morgan("combined")];

    return middlewares;
  }
}

export default new ProdConfig();
