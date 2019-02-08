import IUser from "modules/user/Interface";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_SECRET } from "../../config/config";
import UserService from "../../modules/user/service";

class JWTStrategy {
  private readonly jwtStrategy: Strategy;
  constructor() {
    this.jwtStrategy = new Strategy({
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      secretOrKey: JWT_SECRET,
    }, this.callback);
  }

  public getJWTStrategy = (): Strategy => {
    return this.jwtStrategy;
  }

  private callback = async (JWTPayload: { _id: number }, done: any): Promise<IUser> =>
    UserService.list({ _id: JWTPayload._id })
      .then(([user]) => user ? done(null, user) : done(null, false))
      .catch((err) => done(err))
}

export default new JWTStrategy().getJWTStrategy();
