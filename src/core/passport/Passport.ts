import passport from "passport";
import UserService from "../../modules/user/Service";
import jwtStrategy from "./JWTStrategy";
import localStrategy from "./LocalStrategy";

interface IUser {
  id: number;
}

class Passport {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
    this.config();
  }

  public getPassport = () => passport.initialize();

  private config = () => {
    passport.use("local-login", localStrategy.getLocalStrategy());
    passport.use(jwtStrategy.getJWTStrategy());
    passport.serializeUser((user: IUser, done) => done(null, user.id));
    passport.deserializeUser(
      (id: number, done) => this.userService.list({ _id: id })
        .then((user) => done(null, user))
        .catch((error) => done(error),
        ));
  }
}

export default Passport;
