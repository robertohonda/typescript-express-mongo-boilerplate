import jwt from "jsonwebtoken";
import { JWT_OPTIONS, JWT_SECRET } from "../../config/config";
import IUser from "./Interface";
import UserModel from "./model";

class UserService {

  public signUp = async (user: IUser): Promise<IUser> => {
    return UserModel.create(user);
  }

  public signIn = async (user: IUser): Promise<IResponseSignIn> => {
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
    return UserModel.find(params).exec();
  }
}

interface IResponseSignIn {
  expiresIn: number;
  token: string;
  user: IUser;
}

export default new UserService();
