import mongoose from "mongoose";
import IModel from "../../core/model/IModel";
import IUser from "./Interface";
import UserSchema from "./schema";

class UserModel implements IModel {
  private readonly userModel: mongoose.Model<IUser>;
  constructor() {
    this.userModel = mongoose.model<IUser>("User", UserSchema);
  }
  public getModel = (): mongoose.Model<IUser> => {
    return this.userModel;
  }
}

export default new UserModel().getModel();
