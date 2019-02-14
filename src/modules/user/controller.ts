import { NextFunction, Request, Response } from "express";
import Controller from "../../core/controller/Controller";
import IController from "../../core/controller/IControler";
import UserService from "./service";

class UserController extends Controller implements IController {
  public list = (req: Request, res: Response, next: NextFunction): void => {
    this.handleResponse(UserService.findAndCountAll(), req, res, next);
  }

  public signUp = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.body;
    this.handleResponse(UserService.signUp(user), req, res, next);
  }

  public signIn = (req: Request, res: Response, next: NextFunction): void => {
    const { user } = req;
    this.handleResponse(UserService.signIn(user), req, res, next);
  }
}

export default new UserController();
