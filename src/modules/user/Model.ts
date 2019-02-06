import mongoose from "mongoose";
import IUser from "./Interface";
import UserSchema from "./Schema";

class UserModel {
  public userModel: mongoose.Model<IUser>;
  constructor() {
    this.userModel = mongoose.model<IUser>("User", UserSchema);
  }
  public getUserModel = () => {
    return this.userModel;
  }
}

export default new UserModel().getUserModel();
