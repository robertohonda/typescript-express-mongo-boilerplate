import { Router } from "express";
import UserRouter from "../../modules/user/Router";
import IRouter from "./IRouter";

class MainRouter implements IRouter {
  private readonly router: Router;
  private readonly userRouter: UserRouter;
  constructor() {
    this.router = Router();
    this.userRouter = new UserRouter();
  }

  public getRouter = () => {
    return this.router
      .use("/user", this.userRouter.getRouter());
  }
}

export default MainRouter;
