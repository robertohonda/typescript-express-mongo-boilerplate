import { Router } from "express";
import IRouter from "../../core/router/IRouter";
import UserController from "./Controller";

class UserRouter implements IRouter {
  private readonly router: Router;
  private readonly user: UserController;
  constructor() {
    this.router = Router();
    this.user = new UserController();
  }

  public getRouter = () => {
    const { router } = this;
    router.route("/").get(this.user.create);
    return router;
  }
}

export default UserRouter;
