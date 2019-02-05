import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Controller from "../../core/controller/Controller";
import IController from "../../core/controller/IControler";
import UserModel from "./Model";
class UserController extends Controller implements IController {
  private readonly user: mongoose.Model<mongoose.Document>;
  constructor() {
    super();
    this.user = new UserModel().getUserModel();
  }

  public create = async (req: Request, res: Response, next: NextFunction) =>
    this.handleResponse(this.user.create({
      firstName: "Roberto",
      lastName: "Honda",
    }), req, res, next)
}
export default UserController;
