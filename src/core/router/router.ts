import { Router } from "express";
import UserRouter from "../../modules/user/router";
import IRouter from "./IRouter";

class MainRouter implements IRouter {
  private readonly router: Router;
  constructor() {
    this.router = Router();
  }

  public getRouter = () => {
    return this.router
      .use("/", UserRouter);
  }
}

export default new MainRouter().getRouter();
