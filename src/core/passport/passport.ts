import passport from "passport";
import UserService from "../../modules/user/service";
import jwtStrategy from "./jwtStrategy";
import localStrategy from "./localStrategy";
import { JWT, LOCAL_LOGIN } from "./types";

interface IUser {
  _id: number;
}

class Passport {
  constructor() {
    this.config();
  }

  public getPassport = () => passport;

  private config = () => {
    passport.use(LOCAL_LOGIN, localStrategy);
    passport.use(JWT, jwtStrategy);
    passport.serializeUser((user: IUser, done) => {
      // tslint:disable-next-line:no-console
      console.log(user);
      done(null, user._id);
    });
    passport.deserializeUser(
      (id: number, done) => UserService.list({ _id: id })
        .then(([user]) => done(null, user))
        .catch((error) => done(error),
        ));
  }
}

export default new Passport().getPassport();
