import { Request, Response, Router } from "express";
import IRouter from "../router/Interface";

class UserRouter implements IRouter {

  private readonly router: Router;
  constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    const { router } = this;
    router.route("/")
      .get(
        (req: Request, res: Response) => res.send("oooi"),
        );
    return router;
  }
}

export default UserRouter;
