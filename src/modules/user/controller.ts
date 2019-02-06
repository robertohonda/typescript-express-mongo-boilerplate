import { NextFunction, Request, Response } from "express";
import Controller from "../../core/controller/Controller";
import IController from "../../core/controller/IControler";
import UserService from "./service";

class UserController extends Controller implements IController {
  constructor() {
    super();
  }

  public list = async (req: Request, res: Response, next: NextFunction) =>
    this.handleResponse(UserService.list(), req, res, next)

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    return this.handleResponse(UserService.signUp(user), req, res, next);
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    return this.handleResponse(UserService.signIn(user), req, res, next);
  }
}

export default new UserController();
