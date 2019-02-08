import { Router } from "express";
import passport from "passport";
import IRouter from "../../core/router/IRouter";
import userController from "./controller";

class UserRouter implements IRouter {
  private readonly router: Router;
  constructor() {
    this.router = Router();
  }

  public getRouter = (): Router => {
    const { router } = this;
    router.route("/signup")
      .post(userController.signUp);
    router.route("/signin")
      .post(passport.authenticate("local-login", { session: false }), userController.signIn);
    router.route("/seila")
      .post(passport.authenticate("jwt", { session: false }), (req, res, next) => {
        res.status(200).send(req.user);
      });
    return router;
  }
}

export default new UserRouter().getRouter();
