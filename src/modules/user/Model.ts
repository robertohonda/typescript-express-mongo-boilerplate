import mongoose from "mongoose";
import UserSchema from "./Schema";

class UserMondel {
  public userModel: mongoose.Model<mongoose.Document>;
  constructor() {
    this.userModel = mongoose.model("User", new UserSchema().getUserSchema());
  }
  public getUserModel = () => {
    return this.userModel;
  }
}

export default UserMondel;
