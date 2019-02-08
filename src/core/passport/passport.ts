import { Handler } from "express";
import passport from "passport";
import UserService from "../../modules/user/service";
import JWTStrategy from "./jwtStrategy";
import LocalStrategy from "./localStrategy";
import { JWT, LOCAL_LOGIN } from "./types";

class Passport {
  private readonly passport: passport.Authenticator;
  constructor() {
    this.passport = passport;
    this.config();
  }

  public initialize = (): Handler => this.passport.initialize();

  private config = (): void => {
    this.passport.use(LOCAL_LOGIN, LocalStrategy);
    this.passport.use(JWT, JWTStrategy);
    this.passport.serializeUser((user: { _id: number }, done) => {
      done(null, user._id);
    });
    this.passport.deserializeUser(
      (id: number, done) => UserService.list({ _id: id })
        .then(([user]) => done(null, user))
        .catch((error) => done(error),
        ));
  }
}

export default new Passport();
