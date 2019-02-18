import jwt from "jsonwebtoken";
import { JWT_OPTIONS, JWT_SECRET } from "../../config/config";
import IService from "../../core/service/IService";
import IUser from "./Interface";
import UserModel from "./model";

class UserService implements IService {

  public signUp = async (user: IUser): Promise<{user: IUser}> => {
    return UserModel.create(user).then( (createdUser: IUser) => ({
      user: createdUser,
    }));
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

  public count = (params: any): Promise<number>  => {
    return UserModel.count(params).exec();
  }

  public findAndCountAll = async (params?: any): Promise<{data: IUser[], count: number}> => {
    const data = await this.list(params);
    const count = await this.count(params);
    return {
      count,
      data,
    };
  }
}

interface IResponseSignIn {
  expiresIn: number;
  token: string;
  user: IUser;
}

export default new UserService();
