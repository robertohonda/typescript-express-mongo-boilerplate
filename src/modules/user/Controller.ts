import { NextFunction, Request, Response } from "express";
import Controller from "../../core/controller/Controller";
import UserModel from "./Model";
class UserController extends Controller {
  private readonly user: UserModel;
  constructor() {
    super();
    this.user = new UserModel();
  }

  public create = async (req: Request, res: Response, next: NextFunction) =>
    this.handleResponse(this.user.create(), req, res, next)
}
export default UserController;
