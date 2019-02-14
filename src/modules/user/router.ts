import { Router } from "express";
import passport from "passport";
import IRouter from "../../core/router/IRouter";
import UserController from "./controller";

class UserRouter implements IRouter {
  private readonly router: Router;
  constructor() {
    this.router = Router();
  }

  public getRouter = (): Router => {
    const { router } = this;
    router.route("/signup")
      .post(UserController.signUp);
    router.route("/signin")
      .post(passport.authenticate("local-login", { session: false }), UserController.signIn);
    router.route("/user")
      .get(passport.authenticate("jwt", { session: false }), UserController.list);
    return router;
  }
}

export default new UserRouter().getRouter();
