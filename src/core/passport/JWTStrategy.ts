import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../config/config";
import UserService from "../../modules/user/Service";

class JWTStrategy {
  private readonly jwtStrategy: Strategy;
  private readonly user: UserService;
  constructor() {
    this.user = new UserService();
    this.jwtStrategy = new Strategy({
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: JWT_SECRET,
    }, this.callback);
  }

  public getJWTStrategy = () => {
    return this.jwtStrategy;
  }

  private callback = async (JWTPayload: { _id: number }, done: any) =>
    this.user.list({ _id: JWTPayload._id })
      .then((user) => user ? done(null, user) : done(null, false))
      .catch((err) => done(err))
}

export default new JWTStrategy();
