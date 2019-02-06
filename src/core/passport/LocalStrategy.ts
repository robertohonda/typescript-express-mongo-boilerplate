import { OK } from "http-status";
import IUser from "modules/user/Interface";
import LocalPassport from "passport-local";
import APIError from "../../errors/error/APIError";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "../../errors/types/user";
import UserService from "../../modules/user/Service";

class LocalStrategy {
  private readonly localStrategy: LocalPassport.Strategy;
  private readonly user: UserService;
  constructor() {
    this.user = new UserService();
    this.localStrategy = new LocalPassport.Strategy({
      passwordField: "password",
      session: false,
      usernameField: "email",
    }, this.callback);
  }

  public getLocalStrategy = () => {
    return this.localStrategy;
  }

  private callback = async (email: string, password: string, done: any) => {
    try {
      const user: IUser = (await this.user.list({ email }))[0];

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

export default new LocalStrategy();
