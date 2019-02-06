import { NextFunction, Request, Response } from "express";
import Controller from "../../core/controller/Controller";
import IController from "../../core/controller/IControler";
import UserService from "./Service";
class UserController extends Controller implements IController {
  private readonly userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  public list = async (req: Request, res: Response, next: NextFunction) =>
    this.handleResponse(this.userService.list(), req, res, next)

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    return this.handleResponse(this.userService.signUp(user), req, res, next);
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    return this.handleResponse(this.userService.signIn(user), req, res, next);
  }
}
export default new UserController();
