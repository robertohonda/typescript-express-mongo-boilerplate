import { Request, Response, Router } from "express";

class UserRouter {

  public router: Router;
  constructor() {
    this.router = Router();
  }

  public getRoutes(): Router {
    const { router } = this;
    router.route("/")
      .get(
        ( req: Request, res: Response) => res.send("oooi"),
        );
    return router;
  }
}

export default UserRouter;
