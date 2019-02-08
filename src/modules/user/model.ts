import mongoose from "mongoose";
import IUser from "./Interface";
import UserSchema from "./schema";

class UserModel {
  public userModel: mongoose.Model<IUser>;
  constructor() {
    this.userModel = mongoose.model<IUser>("User", UserSchema);
  }
  public getUserModel = (): mongoose.Model<IUser> => {
    return this.userModel;
  }
}

export default new UserModel().getUserModel();
