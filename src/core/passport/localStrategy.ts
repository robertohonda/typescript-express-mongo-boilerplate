import { OK } from "http-status";
import IUser from "modules/user/Interface";
import { Strategy } from "passport-local";
import APIError from "../../errors/error/APIError";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "../../errors/types/user";
import UserService from "../../modules/user/service";

class LocalStrategy {
  private readonly localStrategy: Strategy;
  constructor() {
    this.localStrategy = new Strategy({
      passwordField: "password",
      usernameField: "email",
    }, this.callback);
  }

  public getLocalStrategy = (): Strategy => {
    return this.localStrategy;
  }

  private callback = async (email: string, password: string, done: any): Promise<any> => {
    try {
      const user: IUser = (await UserService.list({ email }))[0];

      if (!user) { throw new APIError({ status: OK, type: USER_NOT_FOUND, message: "User not registered" }); }

      const validate = await user.isValidPassword(password);
      if (!validate) {
        throw new APIError({
          message: "The password is incorrect",
          status: OK,
          type: WRONG_PASSWORD,
        });
      }

      return done(null, user);

    } catch (error) {
      return done(error);
    }
  }
}

export default new LocalStrategy().getLocalStrategy();
