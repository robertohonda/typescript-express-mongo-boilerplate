import passport from "passport";
import UserService from "../../modules/user/service";
import JWTStrategy from "./jwtStrategy";
import LocalStrategy from "./localStrategy";
import { JWT, LOCAL_LOGIN } from "./types";

class Passport {
  constructor() {
    this.config();
  }

  public getPassport = () => passport;

  private config = () => {
    passport.use(LOCAL_LOGIN, LocalStrategy);
    passport.use(JWT, JWTStrategy);
    passport.serializeUser((user: { _id: number }, done) => {
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