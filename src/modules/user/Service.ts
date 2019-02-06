import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_OPTIONS, JWT_SECRET } from "../../config/config";
import IUser from "./Interface";
import UserModel from "./Model";

class UserService {
  private readonly user: mongoose.Model<IUser>;
  constructor() {
    this.user = UserModel;
  }

  public signUp = async (user: any) => {
    return this.user.create(user);
  }

  public signIn = async (user: any) => {
    const payload = {
      _id: user._id,
    };
    const { expiresIn } = JWT_OPTIONS;

    const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);

    return {
      expiresIn,
      token,
      user,
    };
  }

  public list = (params?: any): Promise<IUser[]> => {
    return this.user.find(params).exec();
  }
}

export default UserService;
